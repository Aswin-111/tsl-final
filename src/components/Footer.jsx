/* eslint-disable react/prop-types */


const Footer = ({ usersdata }) => {
  const { classCount,newjoineescount, beneficiariescount, waitinglistcount, totalmeditatorscount} = usersdata;
  return (
    <>
        <div className="footer-container-wrapper w-100">
            <div className="footer row">
                <div className="footer-sub-grp col-3">
                  <span className="footer-update">{totalmeditatorscount ? totalmeditatorscount : "-"}</span>
                  <span className="footer-head">Total</span>
                </div>
                <div className="footer-sub-grp col-3">
                  <span className="footer-update"> {waitinglistcount ? waitinglistcount : "-"} </span>
                  <span className="footer-head">Waiting</span>
                </div>
                <div className="footer-sub-grp col-3">
                  <span className="footer-update">{beneficiariescount ? beneficiariescount : "-"}</span>
                  <span className="footer-head">Beneficiaries</span>
                </div>
                <div className="footer-sub-grp col-3">
                  <span className="footer-update">{newjoineescount ? newjoineescount : "-"}</span>
                  <span className="footer-head">New</span>
                </div>
            </div>
        </div>
    </>
  )
}

export default Footer