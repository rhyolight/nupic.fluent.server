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

import os
import web

from fluent.model import Model
from fluent.term import Term

from utils.limited_size_dict import LimitedSizeDict



urls = (
  "/", "Home",

  r"/_models/([-\w]*)/feed/([-\w]*)", "Feed",
  r"/_models/([-\w]*)/reset", "Reset"
)

modelCache = LimitedSizeDict(size_limit=25)



class Home:


  def GET(self):
    return "Welcome to Fluent!"



class Feed:


  def POST(self, uid, string):
    model = getModel(uid)
    term = Term().createFromString(string)

    prediction = model.feedTerm(term)
    model.save()

    return prediction.closestString()



class Reset:


  def POST(self, uid):
    model = getModel(uid)
    model.resetSequence()
    model.save()
    return ""



def getModel(uid):
  if uid in modelCache:
    return modelCache[uid]

  modelDir = _getModelDir(uid)

  if not os.path.exists(modelDir):
    os.makedirs(modelDir)

  model = Model(checkpointDir=modelDir)

  if model.hasCheckpoint():
    model.load()

  modelCache[uid] = model
  return model


def _getModelDir(uid):
  return "store/models/{0}".format(uid)



if __name__ == "__main__":
  app = web.application(urls, globals())
  app.run()
