/* eslint-disable react/prop-types */


const Footer = ({ usersdata }) => {
  const { newjoineescount, classCount, beneficiariescount,waitinglistcount,totalmeditatorscount} = usersdata
  return (
    <>
        <div className="footer-container-wrapper w-100">
            <div className="footer row">
                <div className="footer-sub-grp col-3">
                  <span className="footer-update">{totalmeditatorscount}</span>
                  <span className="footer-head">Meditators</span>
                </div>
                <div className="footer-sub-grp col-3">
                  <span className="footer-update"> {waitinglistcount} </span>
                  <span className="footer-head">Waiting List</span>
                </div>
                <div className="footer-sub-grp col-3">
                  <span className="footer-update">{beneficiariescount}</span>
                  <span className="footer-head">Beneficiaries</span>
                </div>
                <div className="footer-sub-grp col-3">
                  <span className="footer-update">{classCount}</span>
                  <span className="footer-head">Classes</span>
                </div>
            </div>
        </div>
    </>
  )
}

export default Footer