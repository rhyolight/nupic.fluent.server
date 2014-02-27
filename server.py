#!/usr/bin/env python
# ----------------------------------------------------------------------
# Numenta Platform for Intelligent Computing (NuPIC)
# Copyright (C) 2014, Numenta, Inc.  Unless you have purchased from
# Numenta, Inc. a separate commercial license for this software code, the
# following terms and conditions apply:
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License version 3 as
# published by the Free Software Foundation.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
# See the GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see http://www.gnu.org/licenses.
#
# http://numenta.org/licenses/
# ----------------------------------------------------------------------

import web

from api import model_api



urls = (
  "/", "Home",
  "/([-\w]*)", "Model",
  "/_models", model_api.app
)

render = web.template.render('static/')



class Home:


  def GET(self):
    return render.base(render.index())



class Model:


  def GET(self, modelId):
    return render.base(render.model(modelId))



if __name__ == "__main__":
  app = web.application(urls, globals())
  app.run()
