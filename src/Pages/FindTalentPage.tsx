import { Divider } from "@mantine/core"
import Jobs from "../FindJobs/Jobs"
import SearchBar from "../FindTalent/SearchBar"
import Talent from "../FindTalent/Talents"

const FindTalentPage = () => {
    return (
        <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins']">
            <SearchBar />
            <Divider size="xs" mx="md" />
            <Talent />
        </div>
    )
}
export default FindTalentPage