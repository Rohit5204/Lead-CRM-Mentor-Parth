import { styled } from '@mui/system';
import { MatxVerticalNav } from 'app/components';
import useSettings from 'app/hooks/useSettings';
import { navigations } from 'app/navigations';
import { navigationTL } from 'app/navigationTL';
import { navigationEmp } from 'app/navigationsEmp';
import { navigationBM } from 'app/navigationBM';
import { Fragment } from 'react';
import Scrollbar from 'react-perfect-scrollbar';

const StyledScrollBar = styled(Scrollbar)(() => ({
  paddingLeft: '1rem',
  paddingRight: '1rem',
  position: 'relative',
}));

const SideNavMobile = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: '100vw',
  background: 'rgba(0, 0, 0, 0.54)',
  zIndex: -1,
  [theme.breakpoints.up('lg')]: { display: 'none' },
}));

const Sidenav = ({ children }) => {
  const { settings, updateSettings } = useSettings();

  const updateSidebarMode = (sidebarSettings) => {
    let activeLayoutSettingsName = settings.activeLayout + 'Settings';
    let activeLayoutSettings = settings[activeLayoutSettingsName];

    updateSettings({
      ...settings,
      [activeLayoutSettingsName]: {
        ...activeLayoutSettings,
        leftSidebar: {
          ...activeLayoutSettings.leftSidebar,
          ...sidebarSettings,
        },
      },
    });
  };
  const roleName = window.localStorage.getItem('roleName');

  return (
    <Fragment>
      {(function () {
        if (roleName == "Admin") {
          return <StyledScrollBar options={{ suppressScrollX: true }}>
            {children}
            <MatxVerticalNav items={navigations} />
          </StyledScrollBar>;
        }
        else if (roleName == "Branch Manager") {
          return <StyledScrollBar options={{ suppressScrollX: true }}>
            {children}
            <MatxVerticalNav items={navigationBM} />
          </StyledScrollBar>;
        }
        else if (roleName == "Team Lead") {
          return <StyledScrollBar options={{ suppressScrollX: true }}>
            {children}
            <MatxVerticalNav items={navigationTL} />
          </StyledScrollBar>;
        }
        else {
          return <StyledScrollBar options={{ suppressScrollX: true }}>
            {children}
            <MatxVerticalNav items={navigationEmp} />
          </StyledScrollBar>
        }
      })()}

      <SideNavMobile onClick={() => updateSidebarMode({ mode: 'close' })} />

    </Fragment>
  );
};

export default Sidenav;
