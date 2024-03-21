import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, FormToggle } from '@wordpress/components';
import { useMemo } from '@wordpress/element';
import {
	sizeOptions,
	sizeOptionsBreakpoints,
	flexboxOptions,
} from '../../block-components/manifest.json';
import { generateClassString } from '../../block-components/responsiveOptions';
import ResponsiveRangeControl from '../../block-components/responsiveRangeControl';
import ResponsiveRangeControlBreakpoints from '../../block-components/responsiveRangeControlBreakpoints';
import FlexboxControl from '../../block-components/FlexboxOptions';

const Edit = ({ attributes, setAttributes }) => {
	const {
		gridGapSettings,
		isAutoGridEnabled,
		autoGridSettings = {},
		flexWrapSettings,
		flexDirectionSettings,
		justifyContentSettings,
		alignItemsSettings,
	} = attributes;

	const getGapClass = useMemo(() => {
		return generateClassString('gap', sizeOptions, gridGapSettings);
	}, [gridGapSettings]);

	const getAutoGridClass = useMemo(() => {
		return generateClassString('grid-auto', sizeOptionsBreakpoints, autoGridSettings);
	}, [autoGridSettings]);

	const getFlexWrapClass = useMemo(() => {
		return generateClassString('', flexboxOptions, flexWrapSettings);
	}, [flexWrapSettings]);

	const getFlexDirectionClass = useMemo(() => {
		const classes = [];
		Object.entries(flexDirectionSettings).forEach(([breakpoint, value]) => {
			if (value) {
				const className = breakpoint ? `${value}@${breakpoint}` : value;
				classes.push(className);
			}
		});
		return classes.join(' ');
	}, [flexDirectionSettings]);

	const getJustifyContentClass = useMemo(() => {
		return generateClassString('', flexboxOptions, justifyContentSettings);
	}, [justifyContentSettings]);

	const getAlignItemsClass = useMemo(() => {
		return generateClassString('', flexboxOptions, alignItemsSettings);
	}, [alignItemsSettings]);

	const blockProps = useBlockProps({
		className: `${
			isAutoGridEnabled ? getAutoGridClass : 'grid'
		} ${getGapClass} ${getFlexWrapClass} ${getFlexDirectionClass} ${getJustifyContentClass} ${getAlignItemsClass}`,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Auto Grid', 'tenup-theme')} initialOpen className="sidebar">
					<div className="flex gap-md">
						<p className="sidebar__subtitle">Enable Auto Grid</p>
						<FormToggle
							label={__('Enable Auto Grid', 'tenup-theme')}
							className="sidebar__toggle"
							checked={isAutoGridEnabled}
							onChange={() =>
								setAttributes({ isAutoGridEnabled: !isAutoGridEnabled })
							}
						/>
					</div>
					<p className="sidebar__desc">
						Automatically set the number of columns based on the content.
					</p>

					{isAutoGridEnabled && (
						<>
							<p className="sidebar__subtitle">Min Column Width</p>
							<p className="sidebar__desc">Set the minimum width for each column.</p>
							<ResponsiveRangeControlBreakpoints
								value={autoGridSettings}
								onChange={(newSettings) =>
									setAttributes({ autoGridSettings: newSettings })
								}
							/>
						</>
					)}
				</PanelBody>
				<PanelBody
					title={__('Columns Settings', 'tenup-theme')}
					initialOpen
					className="sidebar"
				>
					<p className="sidebar__subtitle">Gap</p>
					<p className="sidebar__desc">Set the grid gap here.</p>
					<ResponsiveRangeControl
						value={gridGapSettings}
						onChange={(newSettings) => setAttributes({ gridGapSettings: newSettings })}
					/>
				</PanelBody>
				{!isAutoGridEnabled && (
					<PanelBody
						title={__('Flexbox Settings', 'tenup-theme')}
						initialOpen
						className="sidebar"
					>
						<FlexboxControl
							attributes={attributes}
							setAttributes={setAttributes}
							options={['justify', 'align', 'wrap', 'direction']}
						/>
					</PanelBody>
				)}
			</InspectorControls>
			<div {...blockProps}>
				<div className="col-3">Column 1</div>
				<div className="col-5">Column 2</div>
				<div className="col-12">Column 3</div>
			</div>
		</>
	);
};

export default Edit;
