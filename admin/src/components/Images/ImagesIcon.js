import React from "react";
import styled from "styled-components";
import { Icon } from "@strapi/design-system/Icon";
import { Flex } from "@strapi/design-system/Flex";
import Media from "@strapi/icons/Media";

const IconBox = styled(Flex)`
  /* Hard code color values */
  /* to stay consistent between themes */
  background-color: #fffae6; /* primary100 */
  border: 1px solid #fffae6; /* primary200 */

  svg > path {
    fill: #960528; /* primary600 */
  }
`;

const ImagesIcon = () => {
  return (
    <IconBox
      justifyContent="center"
      alignItems="center"
      width={7}
      height={6}
      hasRadius
      aria-hidden
    >
      <Icon as={Media} />
    </IconBox>
  );
};

export default ImagesIcon;
