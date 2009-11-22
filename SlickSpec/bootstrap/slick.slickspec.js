function setupMethods(specs, window){
	var Slick = window.Slick || global.Slick;
	
	window.SELECT = function(context, selector){
		return Slick.search(context, selector);
	};
	window.SELECT1 = function(context, selector){
		return Slick.find(context, selector);
	};
	window.MATCH = function(context, selector){
		return Slick.match(context, selector);
	};
	window.isXML = function(document){
		return Slick.isXML(document);
	};
}

function verifySetupMethods(specs, window){
	Describe('Verify Setup',function(){
		it['should define SELECT'] = function(){
			value_of( typeof window.SELECT ).should_be('function');
			value_of( window.SELECT(window.document, '*').length ).should_not_be(0);
		};
		it['should define MATCH'] = function(){
			value_of( typeof window.MATCH ).should_be('function');
			value_of( window.MATCH(window.document.documentElement, '*') ).should_be_true();
		};
		it['should define isXML'] = function(){
			value_of( typeof window.isXML ).should_be('function');
			value_of( typeof window.isXML(window.document) ).should_be('boolean');
		};
	});
};
function verifySetupContext(specs, context){
	Describe('Verify Context',function(){

		it['should set the context properly'] = function(){
			value_of(context).should_not_be(global);
			value_of(context).should_not_be(window);
			value_of(context.document).should_not_be_undefined();
			value_of(context.document.nodeType).should_be(9);
			
			var title = context.document.getElementsByTagName('title');
			for (var i=0, l=title.length; i < l; i++)
				if (title[i].firstChild)
					value_of(title[i].firstChild.nodeValue).should_not_match(404);
			
		};

	});
};

setupMethods({},this);
new Mock('',setupMethods);

verifySetupMethods({},this);
new Mock('',verifySetupMethods);
new Mock('',verifySetupContext);
