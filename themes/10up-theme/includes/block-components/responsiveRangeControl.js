import { RangeControl } from '@wordpress/components';
import BreakpointSettings from './responsiveOptions';

const ResponsiveRangeControl = ({ value = {}, onChange, options = [] }) => {
	const handleBreakpointChange = (breakpoint, newValue) => {
		const newSettings = {
			...value,
			[breakpoint]: newValue,
		};
		onChange(newSettings);
	};

	const renderResponsiveRangeControl = (breakpoint, settings, onUpdate) => {
		const currentValueIndex = options.findIndex(
			(option) => option.value === settings[breakpoint],
		);

		const currentValue = currentValueIndex !== -1 ? options[currentValueIndex].label : '';

		return (
			<div className="responsive-range-control">
				<RangeControl
					label={`Screen size: ${breakpoint !== '' ? `${breakpoint}` : 'All'}`}
					value={currentValueIndex !== -1 ? currentValueIndex : undefined}
					onChange={(newIndex) => {
						if (newIndex === undefined || newIndex < 0 || newIndex >= options.length) {
							onUpdate(breakpoint, undefined);
						} else {
							onUpdate(breakpoint, options[newIndex].value);
						}
					}}
					min={0}
					max={options.length - 1}
					withInputField={false}
					allowReset
					renderTooltipContent={(index) => {
						if (index >= 0 && index < options.length) {
							return options[index].label;
						}
						return null;
					}}
				/>
				<div className="responsive-range-control__value">
					{currentValue === '' ? 'None' : currentValue}
				</div>
			</div>
		);
	};

	return (
		<BreakpointSettings
			settings={value}
			onUpdate={handleBreakpointChange}
			renderControl={renderResponsiveRangeControl}
		/>
	);
};

export default ResponsiveRangeControl;
