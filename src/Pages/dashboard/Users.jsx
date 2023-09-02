import React, { useEffect, useState } from "react";
import UsersModelDialog from "./Users.AddNewUser";
import UsersAddNewDevice from "./Users.AddNewDevice";
import UsersViewDetails from "./Users.ViewDetails";

import { useRegisterContext } from "../../context/EndUser/RegisterContext";
import DataTable from "react-data-table-component";
import ServerAuthDialog from "./Users.ServerAuthDialog";

function Users() {
  const { users } = useRegisterContext();

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedrow, setselectecrow] = useState(null);

  // State for ServerAuthDialog
  const [isServerAuthDialogOpen, setServerAuthDialogOpen] = useState(false);
  const [serverAuthAction, setServerAuthAction] = useState(null); // 'add', 'update', or 'view'
  const [selectedServerAuth, setSelectedServerAuth] = useState(null);

  // Handlers for ServerAuthDialog
  const openServerAuthDialog = (action, serverAuth, row) => {
    setselectecrow(row);
    setServerAuthAction(action);
    setSelectedServerAuth(row.serverauths ?? undefined);
    console.log(row.serverauths);
    setServerAuthDialogOpen(true);
  };

  const closeServerAuthDialog = () => {
    setselectecrow(null);
    setServerAuthDialogOpen(false);
    setServerAuthAction(null);
    setSelectedServerAuth(null);
  };

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const openAddDialog = (row) => {
    setselectecrow(row);
    setAddDialogOpen(true);
  };

  const closeAddDialog = () => {
    setselectecrow(null);
    setAddDialogOpen(false);
  };

  const openViewDialog = (row) => {
    setselectecrow(row);
    setViewDialogOpen(true);
  };

  const closeViewDialog = () => {
    setselectecrow(null);
    setViewDialogOpen(false);
  };

  const columns = [
    {
      name: "_id",
      selector: (row) => row._id,
      sortable: true,
    },
    {
      name: "User Name",
      selector: (row) => row.UserName,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (row.isBlocked ? "Blocked" : "Normal"),
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <button
          onClick={() => {
            openAddDialog(row);
          }}
          className="btn"
        >
          Add UUID
        </button>
      ),
    },

    {
      name: "Add Servers",
      button: true,
      cell: (row) => (
        <button
          onClick={() => openServerAuthDialog("add", null, row)}
          className="btn"
        >
          Add{" "}
        </button>
      ),
    },
    /*  {
              name: 'View Servers',
              button: true,
              cell: row => <button onClick={() => openServerAuthDialog('view', row.serverauths, row)} className="btn" > View </button >,
          },*/
    {
      name: "View user details",
      button: true,
      cell: (row) => (
        <button
          onClick={() => {
            openViewDialog(row);
          }}
          className="btn"
        >
          View
        </button>
      ),
    },
  ];

  return (
    <div className="section-center full-page">
      <div className="container page">
        <h2 className="title cred">Manage Credentials</h2>
        <button className="btn" onClick={openDialog}>
          Add User
        </button>
        <br /> <br />
        {/* List of users */}
        {users && (
          <DataTable
            columns={columns}
            data={users}
            direction="auto"
            fixedHeaderScrollHeight="300px"
            highlightOnHover
            pagination
            responsive
            subHeaderAlign="right"
            subHeaderWrap
          />
        )}
        <UsersModelDialog isOpen={isDialogOpen} onClose={closeDialog} />
        <UsersAddNewDevice
          isOpen={isAddDialogOpen}
          rowdata={selectedrow}
          onClose={closeAddDialog}
        />
        <UsersViewDetails
          open={isViewDialogOpen}
          handleClose={closeViewDialog}
          data={selectedrow}
        />
        <ServerAuthDialog
          open={isServerAuthDialogOpen}
          onClose={closeServerAuthDialog}
          action={serverAuthAction}
          serverAuth={selectedServerAuth}
          userId={selectedrow?._id}
        />
      </div>
    </div>
  );
}

export default Users;
