import {
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import BreakpointSettings from './responsiveOptions';
import { sizeOptions } from './manifest.json';

const ResponsiveToggleGroupControl = ({ value = {}, onChange }) => {
	const handleBreakpointChange = (breakpoint, newValue) => {
		onChange({
			...value,
			[breakpoint]: newValue,
		});
	};

	const renderResponsiveToggleGroupControl = (breakpoint, settings, onUpdate) => {
		const currentValueIndex = sizeOptions.findIndex(
			(option) => option.value === settings[breakpoint],
		);

		const currentValue = currentValueIndex !== -1 ? sizeOptions[currentValueIndex].label : '';

		return (
			<div className="responsive-toggle-group-control">
				<ToggleGroupControl
					label={`Screen size: ${breakpoint !== '' ? `${breakpoint}` : 'All'}`}
					value={currentValueIndex !== -1 ? currentValueIndex : undefined}
					onChange={(newIndex) => {
						if (
							newIndex === undefined ||
							newIndex < 0 ||
							newIndex >= sizeOptions.length
						) {
							onUpdate(breakpoint, undefined);
						} else {
							onUpdate(breakpoint, sizeOptions[newIndex].value);
						}
					}}
					min={0}
					max={sizeOptions.length - 1}
					withInputField={false}
					allowReset
					renderTooltipContent={(index) => {
						if (index >= 0 && index < sizeOptions.length) {
							return sizeOptions[index].label;
						}
						return null;
					}}
				/>
			</div>
		);
	};

	return (
		<BreakpointSettings
			settings={value}
			onUpdate={handleBreakpointChange}
			renderControl={renderResponsiveToggleGroupControl}
		/>
	);
};

export default ResponsiveToggleGroupControl;
