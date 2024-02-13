import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Users from "./Users";
import { AdminAuth } from "../services/admin.service";

function Pool() {
  const { pool_id } = useParams();
  const [pool, setPool] = useState(null);
  const [applicants, setApplicants] = useState("");
  const [txt, setTxt] = useState("");

  const getPool = async (e) => {
    try {
      const response = await new AdminAuth().getPool(pool_id);
      if (response) {
        console.log({ dataPool: response?.data });
        setPool(response?.data);
      }
    } catch (error) {
      let msg = error.message;
      if (error.response) {
        msg = error.response?.data.message;
      }
      alert(msg);
    }
  };

  const getApplicants = async (e) => {
    try {
      const response = await new AdminAuth().registerer(pool_id);
      if (response) {
        console.log({ dataApplicant: response?.data });
        setApplicants(response?.data);
      }
    } catch (error) {
      let msg = error.message;
      if (error.response) {
        msg = error.response?.data.message;
      }
      console.log(msg);
    }
  };

  useEffect(() => {
    getPool();
    getApplicants();
  }, []);

  return (
    <div className="bg-black h-auto">
      <div>Population sensor in {pool?.state} </div>

      { applicants && <Users applicants={applicants} /> }
    </div>
  );
}

export default Pool;
