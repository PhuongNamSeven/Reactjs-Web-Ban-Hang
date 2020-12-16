/* eslint-disable */
import React from 'react';

export default function Footer() {
    return (
        <div class="footer ">
            <footer className=" page-footer font-small stylish-color-dark pt-4" style={{ backgroundColor: '#f0f2f4' }}>
                <div className="container text-center">
                    <div className="row">
                        <div className="col-md-4 mx-auto">
                            <h4><strong>DRAGON_SHOP - WEBSITE MUA SẮM UY TÍN NHẤT ĐÔNG LÀO</strong></h4>
                        </div>
                    </div>
                </div>
                <hr />
                <ul className="list-unstyled list-inline text-center py-2">
                    <h5>ADDRESS : QUẬN 12 TP HCM </h5>
                </ul>
                <hr />
                <ul className="list-unstyled list-inline text-center">
                    <li className="list-inline-item">
                        <a className="btn-floating btn-fb mx-1">
                            <i className="fab fa-facebook-f"> </i>
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a className="btn-floating btn-tw mx-1">
                            <i className="fab fa-twitter"> </i>
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a className="btn-floating btn-gplus mx-1">
                            <i className="fab fa-google-plus-g"> </i>
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a className="btn-floating btn-li mx-1">
                            <i className="fab fa-linkedin-in"> </i>
                        </a>
                    </li>
                    <li className="list-inline-item">
                        <a className="btn-floating btn-dribbble mx-1">
                            <i className="fab fa-dribbble"> </i>
                        </a>
                    </li>
                </ul>
            </footer>
        </div>

    );
}