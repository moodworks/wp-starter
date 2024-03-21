import { RangeControl } from '@wordpress/components';
import BreakpointSettings from './responsiveOptions';
import { sizeOptions } from './manifest.json';

const ResponsiveRangeControl = ({ value = {}, onChange }) => {
	const handleBreakpointChange = (breakpoint, newValue) => {
		onChange({
			...value,
			[breakpoint]: newValue,
		});
	};

	const renderResponsiveRangeControl = (breakpoint, settings, onUpdate) => {
		const currentValueIndex = sizeOptions.findIndex(
			(option) => option.value === settings[breakpoint],
		);

		const currentValue = currentValueIndex !== -1 ? sizeOptions[currentValueIndex].label : '';

		return (
			<div className="responsive-range-control">
				<RangeControl
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
				<div className="responsive-range-control__value">
					{
						// if currentValue is empty, show None
						currentValue === '' ? 'None' : currentValue
					}
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
