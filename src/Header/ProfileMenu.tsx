import { Menu, Button, Text, rem, Avatar, Switch } from '@mantine/core';
import {
    IconSettings,
    IconSearch,
    IconPhoto,
    IconMessageCircle,
    IconTrash,
    IconArrowsLeftRight,
    IconUserCircle,
    IconFileText,
    IconMoon,
    IconSun,
    IconMoonStars,
    IconLogout2,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeUser } from '../Slices/UserSlice';
import { removeItem } from '../Services/LocalStorageService';
import { navigateToLogin } from '../Services/AuthService';

const ProfileMenu = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);
    const profile = useSelector((state: any) => state.profile);
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);
    const [opened, setOpened] = useState(false);

    const handleLogout = () => {
        // Clear user data and navigate
        localStorage.removeItem("token"); // Clear token
        dispatch(removeUser()); // Clear user state
        navigate("/login", { replace: true }); // Navigate to login page
    };

    const handleHome = () => {
        navigate('/home');
    }

    return (
        <Menu shadow="md" width={200} opened={opened} onChange={setOpened}>
            <Menu.Target>
                <div className="flex cursor-pointer items-center gap-2">
                    <div className='xs-mx:hidden'>{user?.name}</div>
                    <Avatar src={profile.picture ? `data:image/jpeg;base64,${profile.picture}` : "Avatar.png"} alt="it is me" />
                </div>
            </Menu.Target>

            <Menu.Dropdown onChange={() => setOpened(true)}>
                <Link to="/profile">
                    <Menu.Item leftSection={<IconUserCircle style={{ width: rem(14), height: rem(14) }} />}>
                        Profile
                    </Menu.Item>
                </Link>

                <Menu.Item leftSection={<IconMessageCircle style={{ width: rem(14), height: rem(14) }} />}>
                    Messages
                </Menu.Item>
                <Menu.Item leftSection={<IconFileText style={{ width: rem(14), height: rem(14) }} />}>
                    Resume
                </Menu.Item>
                <Menu.Item
                    leftSection={<IconMoon style={{ width: rem(14), height: rem(14) }} />}
                    rightSection={
                        <Switch checked={checked}
                            onChange={(event) => setChecked(event.currentTarget.checked)} size='md' color='dark.4' onLabel={<IconSun style={{ width: rem(16), height: rem(16) }} stroke={2.5} color="yellow" />}
                            offLabel={<IconMoonStars style={{ width: rem(16), height: rem(16) }} stroke={2.5} color="cyan" />} />
                    }
                >
                    Dark Mode
                </Menu.Item>
                <Menu.Item onClick={handleHome} leftSection={<IconFileText style={{ width: rem(14), height: rem(14) }} />}>
                    Back To Home

                </Menu.Item>

                <Menu.Divider />


                <Menu.Item onClick={handleLogout}
                    color="red"
                    leftSection={<IconLogout2 style={{ width: rem(14), height: rem(14) }} />}
                >
                    Logout
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
export default ProfileMenu