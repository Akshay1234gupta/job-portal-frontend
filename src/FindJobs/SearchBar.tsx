import { Button, Collapse, Divider, RangeSlider } from "@mantine/core"
import { dropdownData } from "../Data/JobsData"
import MultiInput from "./MultiInput"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { updateFilter } from "../Slices/FilterSlice"
import { useDisclosure, useMediaQuery } from "@mantine/hooks"

const SearchBar = () => {
    const matches = useMediaQuery('(max-width:475px)');
    const [opened, { toggle }] = useDisclosure(false);
    const [value, setValue] = useState<[number, number]>([0, 300]);
    const dispatch = useDispatch();

    const handleChange = (event: any) => {
        dispatch(updateFilter({ salary: event }));

    }

    return (<div>
        <div className="flex justify-end">
            {matches &&
                <Button m="sm" onClick={toggle} radius="lg" variant="outline" color="brightSun.4" autoContrast>{opened ? "Close" : "Filters"}</Button>
            }
        </div>
        <Collapse in={(opened || !matches)}>
            <div className="flex lg-mx:!flex-wrap items-center !text-mine-shaft-100 px-5 py-8">
                {
                    dropdownData.map((item, index) => <React.Fragment key={index}><div className="w-1/5 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full xs-mx:mb-1 ">
                        <MultiInput {...item} title={item.title} icon={item.icon} options={item.options} />
                    </div>
                        <Divider className="sm-mx:hidden" mr="xs" size="xs" orientation="vertical" />
                    </React.Fragment>)
                }

                <div className="w-1/5 lg-mx:w-1/4 lg-mx:mt-7 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full  xs-mx:mb-1 [&_.mantine-Slider-label]:!translate-y-10">
                    <div className="flex text-sm justify-between">
                        <div>Salary</div>
                        <div>&#8377;{value[0]} LPA-&#8377;{value[1]} LPA</div>
                    </div>
                    <RangeSlider color="brightSun.4" size="xs" value={value} onChange={setValue} onChangeEnd={handleChange}
                        labelTransitionProps={{
                            transition: 'skew-down',
                            duration: 150,
                            timingFunction: 'linear',
                        }}
                    />
                </div>
            </div>
        </Collapse>
    </div>
    )
}
export default SearchBar