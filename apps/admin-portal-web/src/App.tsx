import {
  makeStyles,
   shorthands,
  tokens,
  Tab,
  TabList
} from "@fluentui/react-components";
import { LiveSiteEnergy } from "./pages/LiveSiteEnergy";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
  },
  header: {
    display: "flex",
    alignItems: "center",
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    height: "48px",
    ...shorthands.padding("0px", "20px"),
    ...shorthands.borderBottom("1px", "solid", tokens.colorTransparentStroke),
  },
  body: {
    display: "flex",
    flexGrow: 1,
  },
  sidebar: {
    width: "220px",
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRight("1px", "solid", tokens.colorTransparentStroke),
    ...shorthands.padding("10px"),
  },
  content: {
    flexGrow: 1,
    ...shorthands.padding("20px"),
    overflowY: 'auto'
  },
});

function App() {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <h2>MiGrid Fleet Portal</h2>
      </header>
      <div className={styles.body}>
        <nav className={styles.sidebar}>
            <TabList vertical>
                <Tab value="tab1">Live Site Energy</Tab>
                <Tab value="tab2">Charging Sessions</Tab>
                <Tab value="tab3">VPP Market Bids</Tab>
                <Tab value="tab4">Driver Management</Tab>
            </TabList>
        </nav>
        <main className={styles.content}>
          <LiveSiteEnergy />
        </main>
      </div>
    </div>
  );
}

export default App;
