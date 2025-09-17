import ActorForm from "@/forms/actor.form";
import ActorsTable from "@/components/UI/tables/actors";

const ActorsPage = () => {
    return (<div>
        <div>
            <ActorForm></ActorForm>
            <ActorsTable></ActorsTable>
        </div>
    </div>)
}
export default ActorsPage;