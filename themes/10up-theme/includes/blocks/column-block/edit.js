/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { useMemo } from '@wordpress/element';
import { generateClassString } from '../../block-components/responsiveOptions';
import ResponsiveRangeControl from '../../block-components/responsiveRangeControl';
import FlexboxControl from '../../block-components/flexboxOptions';
import SpacingOptions from '../../block-components/spacingOptions';
import manifest from '../../block-components/manifest.json';

const { columnSizes, columnOffsetSizes, flexboxOptions } = manifest;

/**
 * Edit component.
 * See https://wordpress.org/gutenberg/handbook/designers-developers/developers/block-api/block-edit-save/#edit
 *
 * @param {object}   props                  The block props.
 * @param {object}   props.attributes       Block attributes.
 * @param {string}   props.attributes.title Custom title to be displayed.
 * @param {string}   props.className        Class name for the block.
 * @param {Function} props.setAttributes    Sets the value for block attributes.
 * @returns {Function} Render the edit screen
 */
const Edit = ({ attributes, setAttributes }) => {
	const {
		colSizeSettings = {},
		colOffsetSettings = {},
		flexWrapSettings,
		flexDirectionSettings,
		justifyContentSettings,
		alignItemsSettings,
	} = attributes;

	const getColClass = useMemo(() => {
		const classes = generateClassString('col', columnSizes, colSizeSettings);
		return classes === '' ? 'col' : classes;
	}, [colSizeSettings]);

	const getColOffset = useMemo(() => {
		return generateClassString('offset', columnOffsetSizes, colOffsetSettings);
	}, [colOffsetSettings]);

	const getFlexWrapClass = useMemo(() => {
		return flexWrapSettings ? generateClassString('', flexboxOptions, flexWrapSettings) : '';
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

	const getSpacingClass = useMemo(() => {
		const { paddingSettings = {}, marginSettings = {} } = attributes;

		const classes = [];

		Object.entries(paddingSettings).forEach(([breakpoint, values]) => {
			if (values) {
				Object.entries(values).forEach(([spacingOption, sizeOption]) => {
					if (sizeOption) {
						const className = breakpoint
							? `${spacingOption}-${sizeOption}@${breakpoint}`
							: `${spacingOption}-${sizeOption}`;
						classes.push(className);
					}
				});
			}
		});

		Object.entries(marginSettings).forEach(([breakpoint, values]) => {
			if (values) {
				Object.entries(values).forEach(([spacingOption, sizeOption]) => {
					if (sizeOption) {
						const className = breakpoint
							? `margin-${spacingOption}-${sizeOption}@${breakpoint}`
							: `margin-${spacingOption}-${sizeOption}`;
						classes.push(className);
					}
				});
			}
		});

		return classes.join(' ');
	}, [attributes]);

	const innerBlocksProps = useInnerBlocksProps({}, {});

	const customProps = `flex ${getColClass} ${getColOffset} ${getFlexWrapClass} ${getFlexDirectionClass} ${getJustifyContentClass} ${getAlignItemsClass} ${getSpacingClass}`;

	const blockProps = useBlockProps({
		className: customProps,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Column Settings', 'tenup-theme')}
					initialOpen
					className="sidebar"
				>
					<p className="sidebar__subtitle">Column size</p>
					<p className="sidebar__desc">Set column size 1-12.</p>
					<ResponsiveRangeControl
						value={colSizeSettings}
						onChange={(newSettings) => setAttributes({ colSizeSettings: newSettings })}
						options={columnSizes}
					/>
					<p className="sidebar__subtitle">Column offset</p>
					<p className="sidebar__desc">Set column offset 0-11.</p>
					<ResponsiveRangeControl
						value={colOffsetSettings}
						onChange={(newSettings) =>
							setAttributes({ colOffsetSettings: newSettings })
						}
						options={columnOffsetSizes}
					/>
				</PanelBody>
				<PanelBody
					title={__('Spacing Settings', 'tenup-theme')}
					initialOpen
					className="sidebar"
				>
					<SpacingOptions
						attributes={attributes}
						setAttributes={setAttributes}
						options={['padding', 'margin']}
					/>
				</PanelBody>

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
			</InspectorControls>
			<div {...blockProps}>{innerBlocksProps.children}</div>
		</>
	);
};
export default Edit;
