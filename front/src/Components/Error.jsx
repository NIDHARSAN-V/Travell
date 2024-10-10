import React from 'react';

function Error({ message = 'An error occurred!', type = 'danger' }) {
  return (
    <div className={`alert alert-${type}`} role="alert">
      {message}
      {/* Uncomment below if you want to add a close button */}
      {/* <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button> */}
    </div>
  );
}

export default Error;
