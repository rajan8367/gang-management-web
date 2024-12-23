function GangAssign({ gangList }) {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Gang Category</DialogTitle>
        <DialogContent>
          <div className="table-responsive table-card mb-4">
            <table className="table align-middle table-nowrap mb-0">
              <thead>
                <tr>
                  <th scope="col" style={{ width: "40px" }}>
                    S.No.
                  </th>
                  <th>Gang Detail</th>
                  <th>Van Detail</th>
                  <th>Loction</th>
                  <th>Last Login</th>
                  <th align="center">Action</th>
                </tr>
              </thead>
              <tbody className="list form-check-all">
                {gangList &&
                  gangList.length > 0 &&
                  gangList.map((gang, index) => (
                    <tr key={gang._id}>
                      <td scope="row">{(currentPage - 1) * 50 + index + 1}</td>
                      <td>
                        <strong>Category:</strong>{" "}
                        {gang.gangCategoryID.categoryName}
                        <br />
                        <strong>Name:</strong> {gang.gangName}
                        <br />
                        <strong>Mobile:</strong> {gang.gangMobile}
                        <br />
                        {/* <strong>SubStation:</strong> {gang.substation} */}
                      </td>
                      <td>
                        {gang.vanAvailable === "yes"
                          ? gang.vanNo
                          : "Van not attached"}
                      </td>
                      <td>
                        {gang.latitude !== "" && gang.longitude !== "" && (
                          <button
                            className="btn btn-primary px-1 py-0"
                            style={{ display: "block" }}
                            onClick={() => {
                              setLocation({
                                lat: gang?.latitude,
                                long: gang?.longitude,
                              });
                              setGangMap(true);
                            }}
                          >
                            <i className="ri-map-pin-line"></i>
                          </button>
                        )}
                      </td>
                      <td>
                        {gang?.lastLoginDate
                          ? convertTimestamp(gang?.lastLoginDate)
                          : "NA"}
                      </td>
                      <td>
                        <button
                          disabled={showLoader}
                          className="btn btn-danger me-2"
                          onClick={() => {
                            Swal.fire({
                              title: "Do you really want to delete?",
                              icon: "question",
                              confirmButtonText: "Yes",
                              showDenyButton: true,
                            }).then((result) => {
                              if (result.isConfirmed) {
                                deleteGang(gang._id);
                              } else if (result.isDenied) {
                                Swal.fire("Delete cancelled", "", "info");
                              }
                            });
                          }}
                        >
                          Delete
                        </button>
                        <button
                          disabled={showLoader}
                          className="btn btn-primary me-2"
                          onClick={() => {
                            getGangData(gang._id);
                            setGangData((prevGangData) => ({
                              ...prevGangData,
                              gangID: gang._id,
                            }));
                          }}
                        >
                          Edit
                        </button>
                        <button
                          disabled={showLoader}
                          className="btn btn-success"
                          onClick={() =>
                            navigate("/inventory-list/" + gang._id)
                          }
                        >
                          Inventory
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default GangAssign;
