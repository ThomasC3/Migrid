import {
    makeStyles,
    shorthands,
    tokens,
    Card,
    CardHeader,
    CardPreview,
  } from "@fluentui/react-components";
  import { EnergyChart } from "../components/EnergyChart";
  
  const useStyles = makeStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      ...shorthands.gap("20px"),
    },
    title: {
      ...shorthands.margin(0),
    },
    kpiContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      ...shorthands.gap("20px"),
    },
    kpiCard: {
        backgroundColor: tokens.colorNeutralBackground3,
    }
  });
  
  export const LiveSiteEnergy = () => {
    const styles = useStyles();
  
    // Mock Data - In a real scenario, this would come from a WebSocket or API call
    const mockKpis = {
      buildingLoad: 75.5, // kW
      evLoad: 120.3, // kW
      gridConnectionLimit: 250, // kW
    };
    const totalLoad = mockKpis.buildingLoad + mockKpis.evLoad;
    const availableCapacity = mockKpis.gridConnectionLimit - totalLoad;
  
    return (
      <div className={styles.root}>
        <h1 className={styles.title}>Live Site Energy Dashboard</h1>
        
        <div className={styles.kpiContainer}>
            <Card className={styles.kpiCard}>
                <CardHeader header={<h3>Building Load</h3>} />
                <h2>{mockKpis.buildingLoad.toFixed(1)} kW</h2>
            </Card>
            <Card className={styles.kpiCard}>
                <CardHeader header={<h3>Total EV Load</h3>} />
                <h2>{mockKpis.evLoad.toFixed(1)} kW</h2>
            </Card>
            <Card className={styles.kpiCard}>
                <CardHeader header={<h3>Available Capacity</h3>} />
                <h2>{availableCapacity.toFixed(1)} kW</h2>
            </Card>
             <Card className={styles.kpiCard}>
                <CardHeader header={<h3>Grid Connection Limit</h3>} />
                <h2>{mockKpis.gridConnectionLimit} kW</h2>
            </Card>
        </div>

        <Card>
            <CardHeader header={<h3>Total Site Load vs. Limit</h3>} />
            <CardPreview>
                <EnergyChart totalLoad={totalLoad} limit={mockKpis.gridConnectionLimit} />
            </CardPreview>
        </Card>
      </div>
    );
  };