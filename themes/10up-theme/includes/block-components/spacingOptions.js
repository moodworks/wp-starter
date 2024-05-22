import { __ } from '@wordpress/i18n';
import {
	PiArrowFatLineUp,
	PiArrowFatLineDown,
	PiArrowFatLineLeft,
	PiArrowFatLineRight,
	PiArrowLineDown,
	PiArrowLineUp,
	PiArrowLineLeft,
	PiArrowLineRight,
} from 'react-icons/pi';
import ResponsiveSelectControl from './responsiveSelectControl';

const SpacingOptions = ({ attributes, setAttributes, options }) => {
	const { paddingSettings, marginSettings } = attributes;

	const spacingOptionsPadding = [
		{ label: <PiArrowLineUp />, value: 'padding-top' },
		{ label: <PiArrowLineRight />, value: 'padding-right' },
		{ label: <PiArrowLineDown />, value: 'padding-bottom' },
		{ label: <PiArrowLineLeft />, value: 'padding-left' },
	];

	const spacingOptionsMargin = [
		{ label: <PiArrowFatLineUp />, value: 'margin-top' },
		{ label: <PiArrowFatLineRight />, value: 'margin-right' },
		{ label: <PiArrowFatLineDown />, value: 'margin-bottom' },
		{ label: <PiArrowFatLineLeft />, value: 'margin-left' },
	];

	const handleResetPadding = (breakpoint) => {
		const updatedPaddingSettings = { ...paddingSettings };
		delete updatedPaddingSettings[breakpoint];
		setAttributes({ paddingSettings: updatedPaddingSettings });
	};

	const handleResetMargin = (breakpoint) => {
		const updatedMarginSettings = { ...marginSettings };
		delete updatedMarginSettings[breakpoint];
		setAttributes({ marginSettings: updatedMarginSettings });
	};

	return (
		<div className="spacing-control">
			{options.includes('padding') && (
				<>
					<p className="sidebar__subtitle">Padding</p>
					<ResponsiveSelectControl
						value={paddingSettings}
						onChange={(newSettings) => setAttributes({ paddingSettings: newSettings })}
						options={spacingOptionsPadding}
						onReset={handleResetPadding}
					/>
				</>
			)}
			{options.includes('margin') && (
				<>
					<p className="sidebar__subtitle">Margin</p>
					<ResponsiveSelectControl
						value={marginSettings}
						onChange={(newSettings) => setAttributes({ marginSettings: newSettings })}
						options={spacingOptionsMargin}
						onReset={handleResetMargin}
					/>
				</>
			)}
		</div>
	);
};

export default SpacingOptions;
