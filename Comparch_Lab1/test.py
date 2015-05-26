import unittest
import main


class TestLab1(unittest.TestCase):
    def test_calcImageColors(self):
        import Image
        import os

        if os.path.isfile("test.png"):
            os.remove("test.png")

        Image.new("RGB", (100, 100), "white").save("test.png")

        actual = main.calcImageColors("test.png")
        expected = [(128 * 128, (255, 255, 255))]

        os.remove("test.png")
        self.assertEqual(actual, expected)

    def test_getAllImagesFromSite(self):
        site = '<html>\n' \
               '<body>\n' \
               '<img src="test1.png">\n' \
               '<img src="test2.jpg">\n' \
               '<img src="test3.jpeg">\n' \
               '</body>\n' \
               '</html>'

        import os

        if os.path.isfile("test.html"):
            os.remove("test.html")

        file = open("test.html", "w")
        file.write(site)
        file.flush()
        file.close()

        actual = main.getAllImagesFromSite("test.html")
        expected = [u'test1.png', u'test2.jpg', u'test3.jpeg']

        os.remove("test.html")
        self.assertEqual(actual, expected)

    def test_getUrlsFromXml(self):
        data = "<?xml version=\"1.0\"?><data><url>url1</url><url>url2</url></data>"

        import os

        if os.path.isfile("test.xml"):
            os.remove("test.xml")

        file = open("test.xml", "w")
        file.write(data)
        file.flush()
        file.close()

        actual = main.getUrlsFromXml("test.xml")
        expected = [u'url1', u'url2']

        os.remove("test.xml")

        self.assertEqual(actual, expected)

    def test_run(self):
        import os
        import shutil
        import Image
        import xml.etree.ElementTree as etree
        from xml.dom import minidom

        # ==================================================
        # Creating dir
        # ==================================================

        if os.path.exists("test"):
            shutil.rmtree('test')

        os.mkdir("test")

        # ==================================================
        # Creating images
        # ==================================================

        Image.new("RGB", (100, 100), "white").save("test/1.png")
        Image.new("RGB", (100, 100), (128, 64, 64)).save("test/2.png")
        Image.new("RGB", (100, 100), (64, 128, 64)).save("test/3.png")
        Image.new("RGB", (100, 100), (64, 64, 128)).save("test/4.png")
        Image.new("RGB", (100, 100), "black").save("test/5.png")

        # ==================================================
        # Creating in.xml
        # ==================================================

        data = "<?xml version=\"1.0\"?><data><url>test/site1.html</url><url>test/site2.html</url></data>"

        tmpfile = open("test/in.xml", "w")
        tmpfile.write(data)
        tmpfile.flush()
        tmpfile.close()

        # ==================================================
        # Creating site1.html
        # ==================================================

        data = '<html>\n' \
               '<body>\n' \
               '<img src="test/1.png">\n' \
               '<img src="test/2.png">\n' \
               '<img src="test/3.png">\n' \
               '</body>\n' \
               '</html>'

        tmpfile = open("test/site1.html", "w")
        tmpfile.write(data)
        tmpfile.flush()
        tmpfile.close()

        # ==================================================
        # Creating site2.html
        # ==================================================

        data = '<html>\n' \
               '<body>\n' \
               '<img src="test/4.png">\n' \
               '<img src="test/5.png">\n' \
               '</body>\n' \
               '</html>'

        tmpfile = open("test/site2.html", "w")
        tmpfile.write(data)
        tmpfile.flush()
        tmpfile.close()

        # ==================================================
        # Creating expected out.xml
        # ==================================================

        myoutxml = etree.Element("data")

        site = etree.Element("site")
        site.attrib["url"] = "test/site1.html"

        img = etree.Element("image")
        img.attrib["url"] = "test/1.png"

        color = etree.Element("color")
        color.attrib["red"] = str(255)
        color.attrib["green"] = str(255)
        color.attrib["blue"] = str(255)
        color.text = str(16384)

        img.append(color)
        site.append(img)

        img = etree.Element("image")
        img.attrib["url"] = "test/2.png"

        color = etree.Element("color")
        color.attrib["red"] = str(128)
        color.attrib["green"] = str(64)
        color.attrib["blue"] = str(64)
        color.text = str(16384)

        img.append(color)
        site.append(img)

        img = etree.Element("image")
        img.attrib["url"] = "test/3.png"

        color = etree.Element("color")
        color.attrib["red"] = str(64)
        color.attrib["green"] = str(128)
        color.attrib["blue"] = str(64)
        color.text = str(16384)

        img.append(color)
        site.append(img)

        myoutxml.append(site)

        site = etree.Element("site")
        site.attrib["url"] = "test/site2.html"

        img = etree.Element("image")
        img.attrib["url"] = "test/4.png"

        color = etree.Element("color")
        color.attrib["red"] = str(64)
        color.attrib["green"] = str(64)
        color.attrib["blue"] = str(128)
        color.text = str(16384)

        img.append(color)
        site.append(img)

        img = etree.Element("image")
        img.attrib["url"] = "test/5.png"

        color = etree.Element("color")
        color.attrib["red"] = str(0)
        color.attrib["green"] = str(0)
        color.attrib["blue"] = str(0)
        color.text = str(16384)

        img.append(color)
        site.append(img)

        myoutxml.append(site)

        rough_string = etree.tostring(myoutxml)
        reparsed = minidom.parseString(rough_string)
        myoutxml = etree.XML(reparsed.toprettyxml())

        # ==================================================
        # Creating real out.xml
        # ==================================================

        main.run("test/in.xml", "test/out.xml")

        actual = etree.tostring(etree.parse("test/out.xml").getroot())
        expected = etree.tostring(myoutxml)

        shutil.rmtree("test")

        self.assertEqual(actual, expected)


if __name__ == '__main__':
    unittest.main()