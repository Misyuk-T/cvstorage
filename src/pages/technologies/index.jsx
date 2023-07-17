import { getAllTechnologies } from "src/actions/technologies";

const TechnologyList = ({ technologies }) => {
  console.log(technologies, "technologies component");
  return (
    <div>
      <h1>Technology List</h1>
      {technologies.map((technology) => (
        <div key={technology.id}>
          <h3>{technology.name}</h3>
          {/* Render other technology information */}
        </div>
      ))}
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const technologies = await getAllTechnologies();
    return { props: { technologies: technologies || [] } };
  } catch (error) {
    console.error("Error fetching technologies:", error.message);
    return { props: { technologies: [] } };
  }
}

export default TechnologyList;
