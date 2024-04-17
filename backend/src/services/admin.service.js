const { BCRYPT_SALT, DEFAULT_ID } = require("../config");
const Admin = require("../models/admin.model");
const User = require("../models/user.model");
const { VToken, FToken } = require("../models/admin-token.model");
const CustomError = require("./../utils/custom-error");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const randonNum = require("../utils/randonNum");
const {
  sendMail,
  sendForgotPasswordMail,
  sendGeneralMail,
} = require("../utils/sendMail");
const createToken = require("../middlewares/token.middleware");
const Pool = require("../models/pool.model");

class AdminService {
  constructor() {
    return true;
  }

  async login(data) {
    if (!data)
      throw new CustomError("Please provide either username or phoneNumber");
    if (!data.password) throw new CustomError("Please provide a password");
    let result = await Admin.findOne({ email: data.email });
    if (!result)
      throw new CustomError(
        "Please input the right email address and password.",
        404
      );
    console.log({ result });
    await this.Validate(data.password, result);
    result.token = createToken(result);
    return result;
  }

  async Validate(password, data) {
    const compare = await bcrypt.compare(password, data.password);
    if (!compare) throw new CustomError("Wrong password");
    return true;
  }

  async register({
    email,
    password,
    firstname,
    lastname,
    state,
    phone_number,
    gender,
    nin,
  }) {
    if (!email) throw new CustomError("Please provide email lastname");
    if (!password) throw new CustomError("Please provide password");
    if (!firstname) throw new CustomError("Please provide company Name");
    if (!gender) throw new CustomError("Please your Gender");
    if (!nin) throw new CustomError("Please your nin");
    if (!lastname)
      throw new CustomError("Please provide your company/shop lastname");
    if (!state) throw new CustomError("Please input state.");
    if (!phone_number) throw new CustomError("Please provide phone Number");
    const adminWithEmail = await Admin.findOne({ email });
    if (adminWithEmail) throw new CustomError("Email taken. Use another email");

    const admin_id = uuid.v4();
    const newAdmin = new Admin({
      admin_id,
      email,
      password: await bcrypt.hash(password, BCRYPT_SALT),
      firstname,
      lastname,
      state,
      phone_number,
      gender,
      nin,
    });

    const saved = await (await newAdmin.save()).toObject();
    if (!saved) throw new CustomError("Unable to create admin.");
    console.log({ saved });
    saved.token = createToken(saved);

    return {
      saved,
    };
  }

  async sendEmailVerification(data) {
    const token = await randonNum.randomNum();
    console.log({ token });

    const hash = await bcrypt.hash(token, BCRYPT_SALT);

    const newVToken = new VToken({
      token: hash,
      admin_id: data.admin_id,
    });

    const saved = await newVToken.save();
    console.log({ saved });
    if (!saved) throw new CustomError("Unable to create verification token");
    const result = await sendMail({
      otp: token,
      email: data.email,
    });
    console.log({ result });

    if (!result) throw new CustomError("Unable to send verification code");
    return data;
  }

  async VerifyEmailCode(data) {
    const vtoken = await VToken.findOne({ admin_id: data.admin_id });
    if (!vtoken)
      throw new CustomError("Email verification lost. Please sign up again.");
    const valid = await bcrypt.compare(data.token, vtoken.token);
    if (!valid) throw new CustomError("Email verification failed. Wrong token");

    const update = await Admin.updateOne(
      { admin_id: data.admin_id },
      { isEmailVerified: true }
    );

    const dlt = await VToken.deleteMany({ admin_id: data.admin_id });
    if (!dlt) throw new CustomError("Unable to delete verification token");
    console.log({ update });

    return {
      ...data,
      isEmailVerified: true,
    };
  }

  async resendVerificationPin(data) {
    const vtoken = await VToken.findOne({ admin_id: data.admin_id });
    const otp = await randonNum.randomNum();
    data.token = otp.toString();
    data.otp = otp.toString();

    if (!vtoken) throw new CustomError("Email verification token not found");
    const newToken = await new VToken(data);
    const result = await newToken.save();
    if (!result) throw new CustomError("Unable to create verification token");
    const email_result = await this.sendEmailVerification(data);
    console.log({ email_result });
    return email_result;
  }

  async forgotPasswordReset(data) {
    const otp = await randonNum.randomNum();
    console.log({ otp });

    if (!data.email) throw new CustomError("Email is required.");
    data.token = await bcrypt.hash(otp, BCRYPT_SALT);
    const createToken = new FToken(data);
    data.otp = otp;
    await createToken.save();
    if (!createToken) throw new CustomError("Unable to create token");
    const result = await this.sendforgotPasswordEmailCode(data);
    console.log({ result });
    data.otp = await randonNum.randomNum();

    return data;
  }

  async sendforgotPasswordEmailCode(data) {
    const result = await sendForgotPasswordMail(data);
    return result;
  }

  async resendForgotPasswordMail(data) {
    const ftoken = await FToken.findOne({ email: data.email });
    if (!ftoken) throw new CustomError("No token found");
    console.log({ ftoken });
    const otp = await randonNum.randomNum();
    const hash = await bcrypt.hash(otp, BCRYPT_SALT);
    const updated = await FToken.updateOne(
      { email: data.email },
      { token: hash }
    );

    console.log({ updated });

    const email_result = await sendForgotPasswordMail({
      otp,
      email: ftoken.email,
    });
    console.log({ email_result });

    return email_result;
  }

  async verifyforgotPasswordEmailCode(data) {
    const ftoken = await FToken.findOne({ email: data.email });
    if (!ftoken) throw new CustomError("No token found");
    const valid = await bcrypt.compare(data?.token || data?.otp, ftoken.token);
    console.log({ valid });

    if (!valid) throw new CustomError("Email verification failed. Wrong token");
    const user = await Admin.findOne({ email: data.email });
    const hash = await bcrypt.hash(data.password, BCRYPT_SALT);
    const result = await Admin.findOne(
      { email: data.email },
      { password: hash }
    );
    console.log({ result });
    const dlt = await FToken.deleteMany({ email: data.email });
    if (!dlt) throw new CustomError("Unable to delete verification token");

    return result;
  }

  async allAdmins() {
    const admins = await Admin.find({});
    return admins;
  }

  async allPools() {
    const pools = await Pool.find({});
    return pools;
  }

  async createPool({ admin_id, title, description, state, region }) {
    const pool_id = uuid.v4();
    const newPool = new Pool({
      pool_id,
      admin_id,
      title,
      region,
      description,
      state,
    });
    const save = await newPool.save();
    return save;
  }

  async getAdminPools(admin_id) {
    const poolsByAdmin = await Pool.find({ admin_id }).sort({ date: -1 }).limit(50);
    const pools = await Promise.all(
      poolsByAdmin
        .map(async (pool) => {
          const analysis = await this.analysis(pool);
          return { ...pool, ...analysis };
        })
    );
    return pools;
  }

  async getPools(state) {
    const poolsByAdmin = await Pool.find({ state }).sort({ date: -1 }).limit(50);
    const pools = await Promise.all(
      poolsByAdmin
        .map(async (pool) => {
          const analysis = await this.analysis(pool);
          return { ...pool, ...analysis };
        })
    );
    return pools;
  }

  async getPool(pool_id) {
    const pool = await Pool.findOne({ pool_id });
    const analysis = await this.analysis(pool);
    return { ...pool, ...analysis };
  }

  async poolRegisterer(pool_id) {
    const registerer = await User.find({ pool_id });
    return registerer;
  }

  async analysis(pool) {
    const registerer = await User.find({ pool_id: pool?.pool_id });
    const total = registerer?.length;
    const male = (await registerer.filter((x) => x.gender == "male")).length;
    const female = (await registerer.filter((x) => x.gender == "female"))
      .length;
    const youths =
      (await registerer.filter((x) => x.age > 20 && x.age < 40)).length || 0;
    console.log({
      total,
      male,
      female,
      youths,
    });
    const percentageOfMale = (male / total) * 100 || 0;
    const percentageOfFemale = (female / total) * 100 || 0;
    const percentageOfYouth = (youths / total) * 100 || 0;

    console.log({
      percentageOfMale,
      percentageOfFemale,
      percentageOfYouth,
    });
    
    return {
      percentageOfMale,
      percentageOfFemale,
      percentageOfYouth,
      total
    }
  }
}

module.exports = new AdminService();
