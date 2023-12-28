import * as React from "react";
import * as Icon from "../../constants/Icon";
import HomeIcon from "@mui/icons-material/Home";
import AboutIcon from "@mui/icons-material/InfoOutlined";
import ProjectIcon from "@mui/icons-material/AccountTreeOutlined";
import BulbIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import ContactIcon from "@mui/icons-material/ContactSupportOutlined";
import BoardIcon from "@mui/icons-material/Grading";
import DocumentIcon from "@mui/icons-material/TextSnippetOutlined";
import ClothsIcon from "@mui/icons-material/CheckroomOutlined";
import DefaultIcon from "@mui/icons-material/FormatIndentIncreaseOutlined";
import CalendarIcon from "@mui/icons-material/CalendarMonthOutlined";
import ImageResizingIcon from "@mui/icons-material/CropRotateOutlined";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { IsVarOpenAtom, QuickAtom } from "../../recoil/atoms";
import { MenuListContext } from "@/app/views/sidevar";
import { useRouter } from "next/navigation";
import IMenuCategory from "@/app/interfaces/IMenuCategory";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function MenuList(props: IMenuCategory) {
  const open = useRecoilValue(IsVarOpenAtom);
  const menuContext = React.useContext(MenuListContext);
  const menuDetailList = menuContext?.menuDetailList;
  const url = React.useRef("/");
  const router = useRouter();
  const [scrollPosition, setScrollPosition] = useRecoilState(QuickAtom);
  const [expanded, setExpanded] = React.useState<boolean>(false);

  const handleChange =
    () => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(!expanded);
    };

  const handleMenuClick = (url: string) => {
    setScrollPosition({ position: window.scrollY });
    router.push(url);
    router.refresh();
  };

  return (
    <>
      <Accordion
        expanded={expanded}
        onChange={handleChange()}
        sx={{ borderLeft: "0px", padding: "0px" }}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography sx={{ display: open ? 1 : "none" }}>
            {props.menu_type}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ border: "0px", padding: "0px" }}>
          <List>
            {menuDetailList?.map((item, index) => {
              if (item.detail_key === props.detail_key) {
                if (item.detail_key === "00001") {
                  url.current = `/#${item.menu_name}`;
                } else if (item.detail_key === "00004") {
                  switch (item.menu_name) {
                    case "Today's Styling":
                      url.current = `/projects/styling`;
                      break;
                    case "Scheduler":
                      url.current = `/projects/scheduler`;
                      break;
                    case "ImageResizer":
                      url.current = `/projects/imageresizer`;
                      break;
                    default:
                      url.current = `/projects`;
                  }
                } else {
                  url.current = `/board/?title=${item.menu_name}&key=${item.menu_sub_key}`;
                }
                const uri = url.current;

                return (
                  <ListItem
                    key={index}
                    disablePadding
                    sx={{ display: "block" }}
                  >
                    <ListItemButton
                      onClick={() => {
                        handleMenuClick(uri);
                      }}
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {toIcon(item.menu_icon!)}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.menu_name}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              }
            })}
          </List>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

function toIcon(value: string) {
  switch (value) {
    case Icon.Home:
      return <HomeIcon />;
    case Icon.About:
      return <AboutIcon />;
    case Icon.Project:
      return <ProjectIcon />;
    case Icon.Skill:
      return <BulbIcon />;
    case Icon.Contact:
      return <ContactIcon />;
    case Icon.Board:
      return <BoardIcon />;
    case Icon.Document:
      return <DocumentIcon />;
    case Icon.Cloth:
      return <ClothsIcon />;
    case Icon.Calendar:
      return <CalendarIcon />;
    case Icon.Image:
      return <ImageResizingIcon />;
    default:
      return <DefaultIcon />;
  }
}
