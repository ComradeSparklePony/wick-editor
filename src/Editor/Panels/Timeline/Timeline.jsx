/*
 * Copyright 2018 WICKLETS LLC
 *
 * This file is part of Wick Editor.
 *
 * Wick Editor is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Wick Editor is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Wick Editor.  If not, see <https://www.gnu.org/licenses/>.
 */

import React, { Component } from 'react';

import Breadcrumbs from './Breadcrumbs/Breadcrumbs';

import './_timeline.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

class Timeline extends Component {
  constructor (props) {
    super(props);

    this.canvasContainer = React.createRef();
  }

  componentDidMount () {
    let canvasContainerElem = this.canvasContainer.current;

    this.props.project.guiElement.canvasContainer = canvasContainerElem;
    this.props.project.guiElement.resize();
  }

  componentDidUpdate () {
    var project = this.props.project;

    if(project !== this.currentAttachedProject) {
      project.guiElement.on('projectModified', (e) => {
        this.props.projectDidChange();
      });
      project.guiElement.on('projectSoftModified', (e) => {

      });
      project.guiElement.on('doubleClick', (e) => {
        console.log('doubleClick event fired');
        console.log(e);
      });
      project.guiElement.on('rightClick', (e) => {
        console.log('rightClick event fired');
        console.log(e);
      });
      this.currentAttachedProject = project;
    }

    project.guiElement.canvasContainer = this.canvasContainer.current;
    project.guiElement.build();
  }

  render() {
    return(
      <div id="animation-timeline-container">
        <Breadcrumbs
          project={this.props.project}
          setFocusObject={this.props.setFocusObject}
        />
        <div id="animation-timeline" ref={this.canvasContainer} />
      </div>

    )
  }
}

export default Timeline
