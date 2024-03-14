//CSS
import classes from "./FAQ.module.scss"

const DUMMY_DATA = [
    {topicName: "прашање 1", topicText: "tools"},{topicName: "прашање 2", topicText: "прашање 3"},{topicName: "прашање 3", topicText: "tools"}
]

const FAQ = () => {
    return <section>
        <h1>Често поставувани прашања</h1>
        <ol className={classes.container} >
        {DUMMY_DATA.map((item, i) => {
          return (
            <li key={i}><h2>{item.topicName}</h2></li>
          );
        })}
      </ol>
    </section>
}

export default FAQ;