import styles from "./StatBar.module.css"

const maxValue = 20;

const StatBar = (props:{value: number}) => {

    const backgroundColorCalculator = () => {
        if(props.value == 10)
            return "#f39c12"
        if(props.value > 10)
            return "#27ae60"
        return "#e74c3c"
    }

  return (
    <div className={styles.statBar}>
        <div style={{
            width: props.value / (maxValue / 100)   + "%",
            background: backgroundColorCalculator()
        }}></div>
    </div>
  )
}

export default StatBar