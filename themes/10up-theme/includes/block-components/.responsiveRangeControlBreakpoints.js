import { RangeControl } from '@wordpress/components';
import BreakpointSettings from './responsiveOptions';
import manifest from './manifest.json';

const { sizeOptionsBreakpoints } = manifest;

console.log('sizeOptionsBreakpoints:', sizeOptionsBreakpoints);

const ResponsiveRangeControlBreakpoints = ({ value = {}, onChange }) => {
	const handleBreakpointChange = (breakpoint, newValue) => {
		console.log('Breakpoint:', breakpoint);
		console.log('New value:', newValue);
		onChange({
			[breakpoint]: newValue,
		});
	};

	const renderResponsiveRangeControlBreakpoints = (breakpoint, settings, onUpdate) => {
		const currentValueIndex = sizeOptionsBreakpoints.findIndex(
			(option) => option.value === settings[breakpoint],
		);

		const currentValue =
			currentValueIndex !== -1 ? sizeOptionsBreakpoints[currentValueIndex].label : '';
		return (
			<div className="responsive-range-control">
				<RangeControl
					label={`Screen size: ${breakpoint !== '' ? `${breakpoint}` : 'All'}`}
					value={currentValueIndex !== -1 ? currentValueIndex : undefined}
					onChange={(newIndex) => {
						if (
							newIndex === undefined ||
							newIndex < 0 ||
							newIndex >= sizeOptionsBreakpoints.length
						) {
							onUpdate(breakpoint, undefined);
						} else {
							onUpdate(breakpoint, sizeOptionsBreakpoints[newIndex].value);
						}
					}}
					min={0}
					max={sizeOptionsBreakpoints.length - 1}
					withInputField={false}
					allowReset
					renderTooltipContent={(index) => {
						if (index >= 0 && index < sizeOptionsBreakpoints.length) {
							return sizeOptionsBreakpoints[index].label;
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
			renderControl={renderResponsiveRangeControlBreakpoints}
		/>
	);
};

export default ResponsiveRangeControlBreakpoints;
