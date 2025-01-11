import React from 'react'

function Cards() {
    return (
      <div className="row mt-3">
        <div className="col-md-6 col-lg-4 mb-3">
          <div className="card p-3 shadow-sm">
            <p>Card 1</p>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 mb-3">
          <div className="card p-3 shadow-sm">
            <p>Card 2</p>
          </div>
        </div>
      </div>
    );
  }

export default Cards