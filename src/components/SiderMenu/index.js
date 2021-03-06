import 'rc-drawer-menu/assets/index.css';
import DrawerMenu from 'rc-drawer-menu';
import SiderMenu from './SiderMenu';

export default props => (
    props.isMobile ? (
        <DrawerMenu
            parent={null}
            level={null}
            iconChild={null}
            open={!props.collapsed}
            onMaskClick={() => {
              props.onCollapse(true);
            }}
            width="256px"
            style={{zIndex: 99}}
        >
          <SiderMenu {...props}
                     collapsed={props.isMobile ? false : props.collapsed}/>
        </DrawerMenu>
    ) : <SiderMenu {...props} />
)