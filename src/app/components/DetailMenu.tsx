import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DocumentIcon from '@mui/icons-material/DocumentScannerOutlined';
import { useRecoilValue } from 'recoil';
import { IsVarOpenAtom } from '../recoil/atoms';
import axios from 'axios';
import ISideMenu from '../interfaces/ISideMenu';

export default function DetailMenu() {
    const open = useRecoilValue(IsVarOpenAtom);
    const [sideMenu, setSideMenu] = React.useState<ISideMenu[]>([]);

    const printmenu = () => {
      axios.get('http://localhost:6974/sidemenu/').then((resp)=>{
        setSideMenu(resp.data);
        console.log(sideMenu);
      });
    }

    React.useEffect(()=>{
      printmenu();
    },[])

    return <>
        {sideMenu?.map((menu)=>{<><Divider /><List>
        {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DocumentIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List></>})}

        <Divider />
        <List>
          {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DocumentIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Diary', 'React', 'Spring', 'Git'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
    </>
}