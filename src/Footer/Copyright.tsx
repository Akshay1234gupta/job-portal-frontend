import { IconAsset } from "@tabler/icons-react";

const Copyright = () => {
    const currentYear = new Date().getFullYear(); // Get the current year

    return (
        <div className="bg-mine-shaft-950 text-gray-400 text-center py-4">
            <p className="text-sm">
                &copy; {currentYear}  MyJobs. All rights reserved.
            </p>
        </div>
    );
};

export default Copyright;
