from BeautifulSoup import BeautifulSoup
from PIL import Image
import urllib
import cStringIO
import xml.etree.ElementTree as et
from xml.dom import minidom
import sys
import time

__author__ = 'ann'

def calcImageColors(URL):
    try:
        file = cStringIO.StringIO(urllib.urlopen(URL).read())
        img = Image.open(file)
        img = img.resize((128, 128))
        colors = img.getcolors(128 * 128)
        colors.sort(reverse=True)
        return colors[:5]
    except Exception:
        return None

def getAllImagesFromSite(URL):
    try:
        page = BeautifulSoup(urllib.urlopen(URL).read())
        images = page.findAll("img")
        urls = []
        for img in images:
            src = img["src"].lower()
            if src.endswith(".png") or src.endswith(".jpg") or src.endswith(".jpeg"):
                urls.append(img["src"])

        return urls
    except Exception:
        return None

def getUrlsFromXml(file):
    try:
        tree = et.parse(file)
        root = tree.getroot()
        urls = []
        for child in root:
            urls.append(child.text)
        return urls
    except Exception:
        return None

def run(infile="urls.xml",outfile="out.xml"):

    start = time.time()

    urls = getUrlsFromXml(infile)

    root = et.Element("data")

    for url in urls:
        lst = getAllImagesFromSite(url)
        site = et.Element("site")
        site.attrib["url"] = url

        if lst == None:
            lst = []

        i = 0;
        for img in lst:

            sys.stdout.write(url + " - " + str(100 * i / len(lst)) + "%\r")
            sys.stdout.flush()
            time.sleep(.5)
            colors = calcImageColors(img)

            image = et.Element("image")
            image.attrib["url"] = img

            try:
                if colors != None:
                    for color in colors: #(freq,(red.green,blue))
                        element = et.Element("color")
                        element.text = str(color[0])
                        element.attrib["red"] = str(color[1][0])
                        element.attrib["green"] = str(color[1][1])
                        element.attrib["blue"] = str(color[1][2])

                        image.append(element)
                else:
                    image.text = "can't analyze"
            except Exception:
                image.text = "can't parse with PIL"

            site.append(image)

            i += 1

        root.append(site)
        print url + " done, total " + str(len(lst)) + " images"

    rough_string = et.tostring(root)
    reparsed = minidom.parseString(rough_string)
    reparsed = reparsed.toprettyxml()

    outXml = open(outfile, "w")
    outXml.write(reparsed)
    outXml.flush()
    outXml.close()
    print "done, total time: " + str(round(time.time() - start,1))+"s"