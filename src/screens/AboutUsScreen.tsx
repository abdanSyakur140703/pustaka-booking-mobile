import React from 'react';
import { StyleSheet, Text, View, ScrollView,ProgressBarAndroid, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AboutUsScreen = () => {
  const statsData = [
    {
      id: 1,
      icon: 'smile-o', // Ikon untuk Happy Clients
      count: 232,
      title: 'Happy Clients',
      description: 'consequuntur quae',
    },
    {
      id: 2,
      icon: 'book', // Ikon untuk Projects
      count: 521,
      title: 'Projects',
      description: 'adipisci atque cum quia aut',
    },
    {
      id: 3,
      icon: 'headphones', // Ikon untuk Hours of Support
      count: 1453,
      title: 'Hours Of Support',
      description: 'aut commodi quaerat',
    },
    {
      id: 4,
      icon: 'users', // Ikon untuk Hard Workers
      count: 32,
      title: 'Hard Workers',
      description: 'rerum asperiores dolor',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false} overScrollMode="never">
      {/* Section Title */}
      <View style={styles.sectionTitle}>
        <Text style={styles.sectionHeading}>About</Text>
        <Text style={styles.sectionDescription}>
          Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.
        </Text>
      </View>

      {/* Section Content */}
      <View style={styles.contentContainer}>
        {/* Gambar Profil */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'http://10.0.2.2/pustaka-booking/assets/img/my-profile-img.jpg' }}
            style={styles.profileImage}
          />
        </View>

        {/* Konten Teks */}
        <View style={styles.textContent}>
          <Text style={styles.aboutTitle}>UI/UX Designer & Web Developer.</Text>
          <Text style={styles.italicText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>

          {/* Informasi Personal */}
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.infoText}><Text style={styles.boldText}>Birthday:</Text> 1 May 1995</Text>
              <Text style={styles.infoText}><Text style={styles.boldText}>Website:</Text> www.example.com</Text>
              <Text style={styles.infoText}><Text style={styles.boldText}>Phone:</Text> +123 456 7890</Text>
              <Text style={styles.infoText}><Text style={styles.boldText}>City:</Text> New York, USA</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.infoText}><Text style={styles.boldText}>Age:</Text> 30</Text>
              <Text style={styles.infoText}><Text style={styles.boldText}>Degree:</Text> Master</Text>
              <Text style={styles.infoText}><Text style={styles.boldText}>Email:</Text> email@example.com</Text>
              <Text style={styles.infoText}><Text style={styles.boldText}>Freelance:</Text> Available</Text>
            </View>
          </View>

          <Text style={styles.description}>
            Officiis eligendi itaque labore et dolorum mollitia officiis optio vero. Quisquam sunt adipisci omnis et ut. Nulla accusantium dolor incidunt officia tempore. Et eius omnis. Cupiditate ut dicta maxime officiis quidem quia. Sed et consectetur qui quia repellendus itaque neque.
          </Text>
        </View>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        {statsData.map((stat) => (
          <View key={stat.id} style={styles.statsItem}>
            <Icon name={stat.icon} size={50} color="#4CAF50" style={styles.icon} />
            <Text style={styles.statsCount}>{stat.count}</Text>
            <Text style={styles.statsTitle}>{stat.title}</Text>
            <Text style={styles.statsDescription}>{stat.description}</Text>
          </View>
        ))}
      </View>
       {/* Section Title */}
       <View style={styles.sectionTitle}>
        <Text style={styles.sectionHeading}>Skills</Text>
        <Text style={styles.sectionDescription}>
          Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit
        </Text>
      </View>

      <View style={styles.skillsContent}>
        <View style={styles.skillsColumn}>
          <View style={styles.progressItem}>
            <Text style={styles.skill}>HTML</Text>
            <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={0.9} />
          </View>

          <View style={styles.progressItem}>
            <Text style={styles.skill}>CSS</Text>
            <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={0.8} />
          </View>

          <View style={styles.progressItem}>
            <Text style={styles.skill}>JavaScript</Text>
            <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={0.7} />
          </View>
        </View>

        <View style={styles.skillsColumn}>
          <View style={styles.progressItem}>
            <Text style={styles.skill}>PHP</Text>
            <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={0.85} />
          </View>

          <View style={styles.progressItem}>
            <Text style={styles.skill}>WordPress/CMS</Text>
            <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={0.75} />
          </View>

          <View style={styles.progressItem}>
            <Text style={styles.skill}>Photoshop</Text>
            <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={0.6} />
          </View>
        </View>
      </View>
      {/* Section Title */}
      <View style={styles.sectionTitle}>
        <Text style={styles.sectionHeading}>Resume</Text>
        <Text style={styles.sectionDescription}>
          Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit sint
          consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia fugiat sit
          in iste officiis commodi quidem hic quas.
        </Text>
      </View>

      <View style={styles.row}>
        {/* Left Column */}
        <View style={styles.column}>
          <Text style={styles.resumeTitle}>Summary</Text>
          <View style={styles.resumeItem}>
            <Text style={styles.resumeHeading}>Brandon Johnson</Text>
            <Text style={styles.resumeText}>
              Innovative and deadline-driven Graphic Designer with 3+ years of experience designing and developing
              user-centered digital/print marketing material from initial concept to final, polished deliverable.
            </Text>
            <View style={styles.resumeList}>
              <Text>- Portland par 127, Orlando, FL</Text>
              <Text>- (123) 456-7891</Text>
              <Text>- alice.barkley@example.com</Text>
            </View>
          </View>

          <Text style={styles.resumeTitle}>Education</Text>
          <View style={styles.resumeItem}>
            <Text style={styles.resumeHeading}>Master of Fine Arts & Graphic Design</Text>
            <Text style={styles.resumeSubHeading}>2015 - 2016</Text>
            <Text style={styles.resumeInstitution}>Rochester Institute of Technology, Rochester, NY</Text>
            <Text style={styles.resumeText}>
              Qui deserunt veniam. Et sed aliquam labore tempore sed quisquam iusto autem sit. Ea vero voluptatum qui ut
              dignissimos deleniti nerada porti sand markend
            </Text>
          </View>

          <View style={styles.resumeItem}>
            <Text style={styles.resumeHeading}>Bachelor of Fine Arts & Graphic Design</Text>
            <Text style={styles.resumeSubHeading}>2010 - 2014</Text>
            <Text style={styles.resumeInstitution}>Rochester Institute of Technology, Rochester, NY</Text>
            <Text style={styles.resumeText}>
              Quia nobis sequi est occaecati aut. Repudiandae et iusto quae reiciendis et quis Eius vel ratione eius
              unde vitae rerum voluptates asperiores voluptatem Earum molestiae consequatur neque etlon sader mart dila
            </Text>
          </View>
        </View>

        {/* Right Column */}
        <View style={styles.column}>
          <Text style={styles.resumeTitle}>Professional Experience</Text>
          <View style={styles.resumeItem}>
            <Text style={styles.resumeHeading}>Senior Graphic Design Specialist</Text>
            <Text style={styles.resumeSubHeading}>2019 - Present</Text>
            <Text style={styles.resumeInstitution}>Experion, New York, NY</Text>
            <View style={styles.resumeList}>
              <Text>- Lead in the design, development, and implementation of communication materials</Text>
              <Text>- Delegate tasks to the 7 members of the design team and provide counsel on projects</Text>
              <Text>- Supervise the assessment of graphic materials to ensure quality</Text>
              <Text>- Oversee budgets ranging from $2,000 - $25,000</Text>
            </View>
          </View>

          <View style={styles.resumeItem}>
            <Text style={styles.resumeHeading}>Graphic Design Specialist</Text>
            <Text style={styles.resumeSubHeading}>2017 - 2018</Text>
            <Text style={styles.resumeInstitution}>Stepping Stone Advertising, New York, NY</Text>
            <View style={styles.resumeList}>
              <Text>- Developed marketing programs (logos, brochures, presentations, and advertisements)</Text>
              <Text>- Managed up to 5 projects at a time under pressure</Text>
              <Text>- Recommended and consulted with clients on graphic design</Text>
              <Text>- Created 4+ design presentations monthly</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    marginBottom: 20,
    alignItems: 'center',
  },
  sectionHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#555',
  },
  contentContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: 20,
  },
  profileImage: {
    width: 300,
    height: 300,
  },
  textContent: {
    width: '100%',
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  italicText: {
    fontStyle: 'italic',
    marginBottom: 15,
    color: '#555',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  column: {
    flex: 1,
    paddingHorizontal: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  statsItem: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, // Shadow for Android
  },
  icon: {
    marginBottom: 10,
  },
  statsCount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
    textAlign: 'center',
  },
  statsDescription: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  skillsContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skillsColumn: {
    flex: 1,
  },
  progressItem: {
    marginBottom: 15,
  },
  skill: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  resumeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  resumeItem: {
    marginBottom: 20,
  },
  resumeHeading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  resumeSubHeading: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#555',
  },
  resumeInstitution: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  resumeText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  resumeList: {
    marginLeft: 10,
  },
});

export default AboutUsScreen;
