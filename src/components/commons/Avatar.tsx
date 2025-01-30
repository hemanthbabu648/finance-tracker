import React from "react";
import { Avatar as MAvatar, AvatarProps as MAvatarProps } from "@mantine/core";

type AvatarProps = MAvatarProps;

const Avatar: React.FC<AvatarProps> = (props) => {
  return <MAvatar {...props} />;
};

export default Avatar;
