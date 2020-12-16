import React, { Fragment } from 'react';
import './HeaderGianHang.css';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import FlagIcon from '@material-ui/icons/Flag';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import StorefrontIcon from '@material-ui/icons/Storefront';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import { Avatar, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ForumIcon from '@material-ui/icons/Forum';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default  function HeaderGianHang() {
    return (
        <Fragment>
            <div className="Header">
                <div className="Header_Left">
                    <img src="https://pm1.narvii.com/6833/440922126c7c37f060b410e8b89659f6dc43d75bv2_00.jpg"></img>
                    <div className="Header_Input">
                        <SearchIcon />
                        <input placeholder="Search" type="text"></input>
                    </div>
                </div>
                <div className="Header_Center">
                    <div className="Header_Option">
                        <HomeIcon fontSize="large" />
                    </div>
                    <div className="Header_Option">
                        <FlagIcon fontSize="large" />
                    </div>
                    <div className="Header_Option">
                        <SubscriptionsIcon fontSize="large" />
                    </div>
                    <div className="Header_Option">
                        <StorefrontIcon fontSize="large" />
                    </div>
                    <div className="Header_Option">
                        <SupervisedUserCircleIcon fontSize="large" />
                    </div>
                </div>
                <div className="Header_Right">
                    <div className="Header_Info">
                        <Avatar />
                        <h3> Phuong Nam Seven </h3>
                    </div>
                    <IconButton>
                        <AddIcon />
                    </IconButton>
                    <IconButton>
                        <ForumIcon />
                    </IconButton>
                    <IconButton>
                        <NotificationsActiveIcon />
                    </IconButton>
                    <IconButton>
                        <ExpandMoreIcon />
                    </IconButton>
                </div>
            </div>
        </Fragment>
    )
}


