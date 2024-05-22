import { TabPanel } from '@wordpress/components';
import { PiDeviceMobileCamera, PiDeviceTabletSpeaker, PiLaptop, PiDesktop } from 'react-icons/pi';

export const breakpointValues = {
	'': 'All',
	sm: <PiDeviceMobileCamera />,
	md: <PiDeviceTabletSpeaker />,
	lg: <PiLaptop />,
	xl: <PiDesktop />,
};

export const generateClassString = (attr, options, breakpointValues) => {
	return Object.entries(breakpointValues)
		.reduce((classes, [breakpoint, value]) => {
			if (value) {
				const option = options.find((opt) => opt.value === value);
				if (option) {
					let classString = attr ? `${attr}-${option.value}` : option.value;
					if (breakpoint) {
						classString += `@${breakpoint}`;
					}
					classes.push(classString);
				}
			}
			return classes;
		}, [])
		.join(' ');
};

const hasActiveSettings = (settingsObj) => {
	if (settingsObj === null || settingsObj === undefined || settingsObj === '') {
		return false;
	}
	if (typeof settingsObj === 'number') {
		return settingsObj !== 0; // Considering 0 as "inactive" for RangeControl
	}
	if (typeof settingsObj === 'string') {
		return settingsObj !== '';
	}
	if (typeof settingsObj === 'object') {
		return Object.values(settingsObj).some((value) => value !== '');
	}
	return false;
};

const BreakpointSettings = ({ settings, onUpdate, onBreakpointChange, renderControl }) => {
	return (
		<TabPanel
			className="breakpoints-panel"
			activeClass="active-tab"
			tabs={Object.entries(breakpointValues).map(([key, icon]) => ({
				name: key,
				title: icon,
				className: hasActiveSettings(settings?.[key])
					? 'components-tab-panel__tabs-item--active'
					: '',
			}))}
			onSelect={onBreakpointChange}
		>
			{({ name }) => <>{renderControl(name, settings || {}, onUpdate)}</>}
		</TabPanel>
	);
};

export default BreakpointSettings;
