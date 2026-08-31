function UserInfo({ firstname, lastname, username, dateCreated }) {

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-3">
            <div className="text-muted small">First name</div>
            <div>{firstname}</div>
          </div>

          <div className="col-md-3">
            <div className="text-muted small">Last name</div>
            <div>{lastname}</div>
          </div>

          <div className="col-md-3">
            <div className="text-muted small">Username</div>
            <div>{username}</div>
          </div>

          <div className="col-md-3">
            <div className="text-muted small">Created</div>
            <div>{dateCreated}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
