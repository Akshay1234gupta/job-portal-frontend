import { useEffect, useState } from 'react';
import { Checkbox, CheckIcon, Combobox, Group, Input, Pill, PillsInput, useCombobox } from '@mantine/core';
import { IconSearch, IconSelector } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { updateFilter } from '../Slices/FilterSlice';

// const data = ['🍎 Apples', '🍌 Bananas', '🥦 Broccoli', '🥕 Carrots', '🍫 Chocolate'];


export const MultiInput = (props: any) => {
    const dispatch = useDispatch();

    useEffect(() => {
        setData(props.options);
    }, [])

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
    });
    const [search, setSearch] = useState('');
    const [data, setData] = useState<string[]>([]);
    const [value, setValue] = useState<string[]>([]);

    // const handleValueSelect = (val: string) =>
    //     setValue((current) =>
    //         current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
    //     );

    const handleValueSelect = (val: string) => {
        setSearch('');
        if (val === '$create') {
            setData((current) => [...current, search]);
            setValue((current) => [...current, search]);
            dispatch(updateFilter({ [props.title]: [...value, search] }));
        }
        else {
            dispatch(updateFilter({ [props.title]: value.includes(val) ? value.filter((v) => v !== val) : [...value, val] }));

            setValue((current) =>
                current.includes(val) ? current.filter((v) => v !== val) : [...current, val]
            )
        }


    }

    // const handleValueRemove = (val: string) =>
    //     setValue((current) => current.filter((v) => v !== val));

    const handleValueRemove = (val: string) => {
        setValue((current) => current.filter((v) => v !== val));
        dispatch(updateFilter({ [props.title]: value.filter((v) => v !== val) }));
    }

    const values = value
        .slice(
            0, 1
        )
        .map((item) => (
            <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
                {item.length >= 10 ? item.substring(0, 8) + ".." : item}
            </Pill>
        ));

    const options = data.filter((item) => item.toLowerCase().includes(search.trim().toLowerCase())).map((item) => (
        <Combobox.Option value={item} key={item} active={value.includes(item)}>
            <Group gap="sm">
                <Checkbox size='xs' color='brightSun.4'
                    checked={value.includes(item)}
                    onChange={() => { }}
                    aria-hidden
                    tabIndex={-1}
                    style={{ pointerEvents: 'none' }}
                />
                <span className='text-mine-shaft-300'>{item}</span>
            </Group>
        </Combobox.Option>
    ));

    return (
        <Combobox store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false}>
            <Combobox.DropdownTarget>
                <PillsInput variant='unstyled' rightSection={<IconSelector />} pointer onClick={() => combobox.toggleDropdown()}
                    leftSection={
                        <div className='text-bright-sun-400 p-1 bg-mine-shaft-900 rounded-full mr-2'><props.icon /></div>
                    }>
                    <Pill.Group>
                        {value.length > 0 ? (
                            <>
                                {values}
                                {value.length > 1 && (
                                    <Pill>+{value.length - 1} more</Pill>
                                )}
                            </>
                        ) : (
                            <Input.Placeholder className='!text-mine-shaft-300'>{props.title}</Input.Placeholder>
                        )}


                    </Pill.Group>
                </PillsInput>
            </Combobox.DropdownTarget>

            <Combobox.Dropdown>
                <Combobox.Search
                    value={search}
                    onChange={(event) => setSearch(event.currentTarget.value)}
                    placeholder="Search groceries"
                />
                <Combobox.Options>{options}</Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}
export default MultiInput

