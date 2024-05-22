import { __ } from '@wordpress/i18n';
import { FormToggle } from '@wordpress/components';
import ResponsiveRangeControl from './responsiveRangeControl';
import manifest from './manifest.json';

const { maxWidthSizes } = manifest;

const ContainerOptions = ({ attributes, setAttributes }) => {
	const { maxWidthSettings, isFullWidth } = attributes;

	return (
		<div className="container-options">
			<p className="sidebar__subtitle">Container Width</p>
			<p className="sidebar__desc">Set section to 100% width</p>
			<FormToggle
				label={__('Full Width', 'tenup-theme')}
				className="sidebar__toggle"
				checked={isFullWidth}
				onChange={() => setAttributes({ isFullWidth: !isFullWidth })}
			/>
			<p className="sidebar__subtitle">Max Width</p>
			<ResponsiveRangeControl
				value={maxWidthSettings}
				onChange={(newSettings) => setAttributes({ maxWidthSettings: newSettings })}
				options={maxWidthSizes}
			/>
		</div>
	);
};

export default ContainerOptions;
