import { useEffect, useState } from "react"
import CharacterPreview from "./components/CharacterPreview"
import StatBar from "./components/StatBar"

type Attributes = {
  strength: number,
  dexterity: number,
  intelligence: number,
  constitution: number,
  charisma: number,
  wisdom: number
}

type Race = {
  name: string,
  description: string,
  bonuses: {
    strength?: number,
    dexterity?: number,
    intelligence?: number,
    constitution?: number,
    charisma?: number,
    wisdom?: number
  }
  img: string
}

type ApiResponse = {
  base_attributes: Attributes,
  races: Race[]
}

const App = () => {

  const [species, setSpecies] = useState<Race[]>()
  const [base, setBase] = useState<Attributes>()
  const [currentIdx, setCurrentIdx] = useState<number>(-1)

  const [totalAttributes, setTotalAttributes] = useState<Attributes>()

  useEffect(() => {
    fetch("/data.json")
      .then(res => res.json())
      .then(data => {
        const apiData: ApiResponse = data
        setSpecies(apiData.races)
        setBase(apiData.base_attributes)
        setCurrentIdx(0)
      })
  }, [])

  useEffect(() => {
    if (base && species && currentIdx >= 0) {
      const currentBonuses = species[currentIdx].bonuses

      const newTotalAttributes: Attributes = {
        strength: base.strength + (currentBonuses.strength ?? 0),
        dexterity: base.dexterity + (currentBonuses.dexterity ?? 0),
        intelligence: base.intelligence + (currentBonuses.intelligence ?? 0),
        constitution: base.constitution + (currentBonuses.constitution ?? 0),
        charisma: base.charisma + (currentBonuses.charisma ?? 0),
        wisdom: base.wisdom + (currentBonuses.wisdom ?? 0),
      };
      setTotalAttributes(newTotalAttributes)
    }
  }, [currentIdx])

  const increaseIdx = () => {
    if (species)
      setCurrentIdx(prev => (prev + 1) % species.length)
  }

  const decreaseIdx = () => {
    if (species)
      setCurrentIdx(prev => (prev - 1 + species.length) % species.length);
  }

  return (
    <div>
      {species && base && totalAttributes && <div className="mainCard">

        <CharacterPreview img={species[currentIdx].img} alt={species[currentIdx].name} />
        
        <div className="buttons">
          <button onClick={decreaseIdx}><i className="fa-solid fa-arrow-left"></i></button>
          <h2>{species[currentIdx].name}</h2>
          <button onClick={increaseIdx}><i className="fa-solid fa-arrow-right"></i></button>
        </div>

        <label>Erő</label>
        <StatBar value={totalAttributes.strength} />


        <label>Ügyesség</label>
        <StatBar value={totalAttributes.dexterity} />

        <label>Intelligencia</label>
        <StatBar value={totalAttributes.intelligence} />

        <label>Állóképesség</label>
        <StatBar value={totalAttributes.constitution} />

        <label>Karizma</label>
        <StatBar value={totalAttributes.charisma} />

        <label>Bölcsesség</label>
        <StatBar value={totalAttributes.wisdom} />

      </div>}
    </div>
  )
}

export default App