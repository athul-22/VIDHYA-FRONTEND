import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";
import NewLogo from '../../../../../assets/VIDHYA.png'

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      {/* <Image src="/images/logos/logo-dark.svg" alt="logo" height={70} width={174} priority /> */}
      <Image src={NewLogo} height={70} width={174} priority  alt="logo"/>
    </LinkStyled>
  );
};

export default Logo;
