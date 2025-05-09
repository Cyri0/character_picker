import styles from "./CharacterPreview.module.css"

const CharacterPreview = ( props: {img: string, alt?: string}) => {
  return (
    <div className={styles.characterPreview}>
        <img src={props.img} alt={props.alt ? props.alt : "Character image"}/>
    </div>
  )
}

export default CharacterPreview