import { Button, Collapse, Divider, Input, RangeSlider } from "@mantine/core"
import React, { useState } from "react"
import { searchFields } from "../Data/TalentData";
import MultiInput from "../FindJobs/MultiInput";
import { IconUserCircle } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slices/FilterSlice";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const SearchBar = () => {
    const matches = useMediaQuery('(max-width:475px)');
    const [opened, { toggle }] = useDisclosure(false);

    const [value, setValue] = useState<[number, number]>([0, 50]);
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const handleChange = (name: any, event: any) => {

        if (name == "exp")
            dispatch(updateFilter({ exp: event }));
        else {
            dispatch(updateFilter({ name: event.target.value }));

            setName(event.target.value);
        }

    }
    return (<div>
        <div className="flex justify-end">
            {matches &&
                <Button m="sm" onClick={toggle} radius="lg" variant="outline" color="brightSun.4" autoContrast>{opened ? "Close" : "Filters"}</Button>
            }
        </div>
        <Collapse in={(opened || !matches)}>
            <div className="flex px-5 py-8 lg-mx:!flex-wrap items-center !text-mine-shaft-100">
                <div className="w-1/5 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full xs-mx:mb-1 flex items-center">
                    <div className="text-bright-sun-400 bg-mine-shaft-900 rounded-full p-1 mr-2"><IconUserCircle size={20} /></div>
                    <Input defaultValue={name} onChange={(e) => handleChange("name", e)} className="[&_input]:!placeholder-mine-shaft-300" variant="unstyled" placeholder="Talent Name" />
                </div>
                {
                    searchFields.map((item, index) => <React.Fragment key={index}><div className="w-1/5 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full xs-mx:mb-1 ">
                        <MultiInput {...item} />
                    </div>
                        <Divider className="sm-mx:hidden" mr="xs" size="xs" orientation="vertical" />
                    </React.Fragment >)
                }
                <div className="w-1/5 lg-mx:w-1/4 lg-mx:mt-7 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full xs-mx:mb-1   [&_.mantine-Slider-label]:!translate-y-10">
                    <div className="flex text-sm justify-between">
                        <div>Experience(Year)</div>
                        <div>{value[0]} - {value[1]}</div>
                    </div>
                    <RangeSlider onChangeEnd={(e) => handleChange("exp", e)} color="brightSun.4" min={1} max={50} minRange={1} size="xs" value={value}
                        labelTransitionProps={{
                            transition: 'skew-down',
                            duration: 150,
                            timingFunction: 'linear',
                        }}
                        onChange={setValue} />
                </div>
            </div>
        </Collapse>
    </div>
    )
}
export default SearchBar