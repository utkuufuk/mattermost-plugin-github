// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import IssueAttributeSelector from 'components/issue_attribute_selector';

export default class GithubLabelSelector extends PureComponent {
    static propTypes = {
        repo: PropTypes.string,
        theme: PropTypes.object.isRequired,
        labels: PropTypes.array.isRequired,
        onChange: PropTypes.func,
        actions: PropTypes.shape({
            getLabels: PropTypes.func.isRequired,
        }).isRequired,
    };

    handleChange = (items) => {
        if (!items || items.length === 0) {
            return;
        }

        this.props.onChange(items);
    };

    render() {
        const loadLabels = async () => {
            if (this.props.repo === '') {
                return [];
            }

            await this.props.actions.getLabels(this.props.repo);

            return this.props.labels.map((item) => ({
                value: item.name,
                label: item.name,
            }));
        };

        return (
            <div className='form-group margin-bottom x3'>
                <label className='control-label margin-bottom x2'>
                    {'Labels'}
                </label>
                <IssueAttributeSelector
                    name={'labels'}
                    repo={this.props.repo}
                    required={false}
                    isMulti={true}
                    theme={this.props.theme}
                    onChange={this.handleChange}
                    load={loadLabels}
                />
            </div>
        );
    }
}
