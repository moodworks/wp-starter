// import foo from './bar'
// import foo from './bar.scss'
import '../../css/admin/admin-style.scss';
import { __ } from '@wordpress/i18n';
import { registerBlockExtension } from '@10up/block-components';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, ToggleControl, SelectControl } from '@wordpress/components';

const additionalAttributes = {
	hasResponsiveSettings: {
		type: 'boolean',
		default: false,
	},
	contentWidth: {
		type: 'string',
		default: '',
	},
};

const BlockEdit = (props) => {
	const setResponsiveSettings = (value) => {
		props.setAttributes({ hasResponsiveSettings: value });
	};

	const contentWidth = (value) => {
		props.setAttributes({ hasResponsiveDisplay: value });
	};

	return (
		<InspectorControls>
			<PanelBody title="Container Settings">
				<PanelRow>
					<ToggleControl
						label="Simple container"
						checked={props.attributes.hasResponsiveSettings}
						onChange={setResponsiveSettings}
					/>
				</PanelRow>
				{props.attributes.hasResponsiveSettings && (
					<PanelRow>
						<SelectControl
							label="Content Width"
							labelPosition="top"
							className="width-100%"
							value={props.attributes.hasResponsiveDisplay}
							options={[
								{ label: __('Disable', 'content-block'), value: '' },
								{ label: __('Min', 'content-block'), value: 'xxxxs' },
								{ label: __('3X-small', 'content-block'), value: 'xxxs' },
								{ label: __('2X-small', 'content-block'), value: 'xxs' },
								{ label: __('X-small', 'content-block'), value: 'xs' },
								{ label: __('Small', 'content-block'), value: 'sm' },
								{ label: __('Medium', 'content-block'), value: 'md' },
								{ label: __('Large', 'content-block'), value: 'lg' },
								{ label: __('X-large', 'content-block'), value: 'xl' },
								{ label: __('2X-large', 'content-block'), value: 'xxl' },
								{ label: __('3X-large', 'content-block'), value: 'xxxl' },
								{ label: __('Max', 'content-block'), value: 'xxxxl' },
							]}
							onChange={contentWidth}
						/>
					</PanelRow>
				)}
			</PanelBody>
		</InspectorControls>
	);
};

const generateClassName = (attributes) => {
	let string = '';
	if (attributes.hasResponsiveSettings && attributes.hasResponsiveDisplay) {
		string += `has-responsive-settings has-responsive-display-${attributes.hasResponsiveDisplay}`;
	}
	return string;
};

registerBlockExtension(['core/group', 'core/column'], {
	extensionName: 'responsive-settings',
	attributes: additionalAttributes,
	classNameGenerator: generateClassName,
	Edit: BlockEdit,
});
