"use client"

import { Avatar, Button } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import PhoneIcon from "@material-ui/icons/Phone";

import styles from "./profile.module.scss";


import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const Profile = ({ item: { id, customer, profile, email } }) => {
  const nameParts = customer.name?.split(" ");
  const fname = nameParts[0] || "";
  const lname = nameParts[1] || "";


  const [open, setOpen] = React.useState(false);
  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true)
  };
  const handleClose = () => setOpen(false);

  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <>
      {domLoaded &&
        <>
          <div className={styles.profile}>
            <Avatar alt='Remy Sharp' src={profile} />
            <div className={styles.title}>
              {fname} {lname}
            </div>
            <div className={styles.status}>&#8226; offline</div>
            <div className={styles.actions}>
              <Button size='small' variant='outlined'>
                <PhoneIcon fontSize='small' /> Call
              </Button>
              <Button size='small' variant='outlined'>
                <AccountCircle fontSize='small' /> Profile
              </Button>
            </div>
          </div>
          <div className={styles.details}>
            <h6 className="font-bold">Customer details</h6>
            <div className={styles.row}>
              <div className={styles.heading}>Email</div>
              <div className={styles.value}>{customer.id}@facebook.com</div>
            </div>
            <div className={styles.row}>
              <div className={styles.heading}>First Name</div>
              <div className={styles.value}>{fname}</div>
            </div>
            <div className={styles.row}>
              <div className={styles.heading}>Last Name</div>
              <div className={styles.value}>{lname}</div>
            </div>
            <div className={styles.row}>
              {/* eslint-disable-next-line */}
              <a href='' className={styles.link} onClick={handleOpen}>
                View more details
              </a>
            </div>
          </div>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className={styles.details}>
                <h6 className="font-bold">Customer details</h6>
                <div className={styles.row}>
                  <div className={styles.heading}>Email</div>
                  <div className={styles.value}>{customer.id}@facebook.com</div>
                </div>
                <div className={styles.row}>
                  <div className={styles.heading}>First Name</div>
                  <div className={styles.value}>{fname}</div>
                </div>
                <div className={styles.row}>
                  <div className={styles.heading}>Last Name</div>
                  <div className={styles.value}>{lname}</div>
                </div>
              </div>
            </Box>
          </Modal>
        </>
      }
    </>
  );
};

export default Profile;