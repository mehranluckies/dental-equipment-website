<template>
    <div class="announcement-bar">
      <img
        src="/image/announcement/banner.gif"
        alt="Announcement"
        class="announcement-bar__image"
      />
    </div>
  </template>
  
  <style scoped lang="scss">
  .announcement-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  
    width: 100%;
    height: 35px;
  
    z-index: 200;
  
    overflow: hidden;
  
    background: #123B4A;
  }
  
  .announcement-bar__image {
    display: block;
  
    width: 100%;
    height: 100%;
  
    object-fit: cover;
    object-position: center;
  
    margin: 0;
    padding: 0;
  }
  </style>