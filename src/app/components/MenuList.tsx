import * as React from 'react';
import IMenuItem from "../interfaces/IMenuItem";
import axios from 'axios';

export default function MenuList() {
    const [detailMenuList, setDetailMenuList] = React.useState<IMenuItem[]>([]);

    const printmenu = () => {
        axios.get('http://localhost:6974/sidemenu/menuitem').then((resp)=>{
          setDetailMenuList(resp.data);
        });
      };

    React.useEffect(()=>{
        printmenu();
    },[]);
}