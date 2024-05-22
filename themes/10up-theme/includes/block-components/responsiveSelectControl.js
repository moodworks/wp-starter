import { SelectControl, Button } from '@wordpress/components';
import BreakpointSettings from './responsiveOptions';
import manifest from './manifest.json';

const { sizeOptions } = manifest;

const ResponsiveSelectControl = ({ value = {}, onChange, options = [], onReset }) => {
	const handleBreakpointChange = (breakpoint, optionValue, newValue) => {
		onChange({
			...value,
			[breakpoint]: {
				...value[breakpoint],
				[optionValue]: newValue,
			},
		});
	};

	const handleResetBreakpoint = (breakpoint) => {
		onReset(breakpoint);
	};

	const renderResponsiveSelectControl = (breakpoint, settings, onUpdate) => {
		const renderOptions = () => {
			return options.map((option) => (
				<div key={option.value} className="responsive-select-control__option">
					<SelectControl
						label={option.label}
						value={settings[breakpoint]?.[option.value] || ''}
						onBlur={() => {}}
						onChange={(newValue) => onUpdate(breakpoint, option.value, newValue)}
						onFocus={() => {}}
						options={[
							{
								disabled: true,
								label: 'Select an Option',
								value: '',
							},
							...sizeOptions,
						]}
					/>
				</div>
			));
		};

		return (
			<div className="responsive-select-control">
				<div className="responsive-select-control__header">
					<p className="components-base-control__label">
						Screen size: {breakpoint !== '' ? `${breakpoint}` : 'All'}
					</p>
				</div>
				{renderOptions()}
				<Button isSecondary onClick={() => handleResetBreakpoint(breakpoint)} size="small">
					Reset
				</Button>
			</div>
		);
	};

	return (
		<BreakpointSettings
			settings={value}
			onUpdate={handleBreakpointChange}
			renderControl={renderResponsiveSelectControl}
		/>
	);
};

export default ResponsiveSelectControl;
